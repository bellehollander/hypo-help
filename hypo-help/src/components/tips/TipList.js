import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./tips.css";

export const TipList = ({ searchTerms }) => {
  const [tips, setTips] = useState([]);
  const [symptomTip, setSymptomTip] = useState([]);
  const [likes, setLikes] = useState({});

  const hypoUser = localStorage.getItem("hypo_user");
  const hypoUserObject = JSON.parse(hypoUser);

  const tipList = () => {
    fetch(`http://localhost:8088/tips?_expand=user&_embed=likes`)
      .then((response) => response.json())
      .then((tipData) => {
        setTips(tipData);
        localStorage.setItem("tips", JSON.stringify(tipData));

        const userLikes = {};
        tipData.forEach((tip) => {
          tip.likes.forEach((like) => {
            if (like.userId === hypoUserObject.id) {
              userLikes[tip.id] = like;
            }
          });
        });
        setLikes(userLikes);
        localStorage.setItem("likes", JSON.stringify(userLikes));
      })
      .catch((error) => {
        console.error("Error retrieving tips:", error);
      });
  };

  useEffect(() => {
    const storedTips = localStorage.getItem("tips");
    if (storedTips) {
      setTips(JSON.parse(storedTips));
    }

    const storedLikes = localStorage.getItem("likes");
    if (storedLikes) {
      setLikes(JSON.parse(storedLikes));
    }

    tipList();
  }, []);

  useEffect(() => {
    const storedLikes = localStorage.getItem("likes");
    if (storedLikes) {
      setLikes(JSON.parse(storedLikes));
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8088/symptomTip?_expand=symptom`)
      .then((response) => response.json())
      .then((symptomTipData) => {
        setSymptomTip(symptomTipData);
      })
      .catch((error) => {
        console.error("Error retrieving symptom tips:", error);
      });
  }, []);

  const handleDeleteTip = (tipId) => {
    fetch(`http://localhost:8088/tips/${tipId}`, {
      method: "DELETE",
    })
      .then(() => {
        setTips((prevTips) => {
          const updatedTips = prevTips.filter((tip) => tip.id !== tipId);
          localStorage.setItem("tips", JSON.stringify(updatedTips));
          return updatedTips;
        });

        tipList();
      })
      .catch((error) => {
        console.error("Error deleting tip:", error);
      });
  };

  const handleLike = (tipId) => {
    const isLiked = likes[tipId];

    if (isLiked) {
      const matchingLike = Object.values(likes).find(
        (like) => like.tipId === tipId && like.userId === hypoUserObject.id
      );

      if (matchingLike) {
        fetch(`http://localhost:8088/likes/${matchingLike.id}`, {
          method: "DELETE",
        })
          .then(() => {
            setLikes((prevLikes) => {
              const updatedLikes = { ...prevLikes };
              delete updatedLikes[tipId];
              localStorage.setItem("likes", JSON.stringify(updatedLikes));
              return updatedLikes;
            });
          })
          .catch((error) => {
            console.error("Error deleting like:", error);
          });
      }
    } else {
      fetch(`http://localhost:8088/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipId: tipId,
          userId: hypoUserObject.id,
        }),
      })
        .then((response) => response.json())
        .then((newLike) => {
          setLikes((prevLikes) => {
            const updatedLikes = { ...prevLikes };
            updatedLikes[tipId] = newLike;
            localStorage.setItem("likes", JSON.stringify(updatedLikes));
            return updatedLikes;
          });
        })
        .catch((error) => {
          console.error("Error adding like:", error);
        });
    }
  };

  return (
    <>
      <h2 className="tip-header">hypo-help tips</h2>
      {tips.map((tip) => {
        const matchingSymptomTip = symptomTip.find(
          (symptom) => symptom.tipId === tip.id
        );

        const symptomName = matchingSymptomTip?.symptom?.name || "";
        const isLiked = likes[tip.id];

        if (
          searchTerms &&
          symptomName.toLowerCase().startsWith(searchTerms.toLowerCase())
        ) {
          return (
            <article className="tip" key={tip.id}>
              <div className="symptom">Symptom: {symptomName}</div>
              <div className="description">{tip.description}</div>
              <div className="admin">Admin: {tip?.user?.name}</div>
              <div className="like-section">
                <button
                  onClick={() => handleLike(tip.id)}
                  className={`like-button ${isLiked ? "liked" : ""}`}
                  disabled={!hypoUserObject || !hypoUserObject.id}
                >
                  {isLiked ? (
                    <span className="heart-icon">&#x2665;</span>
                  ) : (
                    <span className="heart-icon">&#x2661;</span>
                  )}
                </button>
              </div>
            </article>
          );
        } else if (!searchTerms) {
          const isCurrentUserTip = hypoUserObject?.id === tip.userId;
          return (
            <article className="tip" key={tip.id}>
              {isCurrentUserTip && (
                <Link
                  to={`/viewAllTip/${tip.id}/editTip`}
                  className="edit-link"
                >
                  Edit
                </Link>
              )}
              <div className="symptom">Symptom: {symptomName}</div>
              <div className="description">{tip.description}</div>
              <div className="admin">Admin: {tip?.user?.name}</div>
              {hypoUserObject?.staff && isCurrentUserTip && (
                <button
                  onClick={() => handleDeleteTip(tip.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              )}
              <div className="like-section">
                {hypoUserObject.staff === false && (
                  <button
                    onClick={() => handleLike(tip.id)}
                    className={`like-button ${isLiked ? "liked" : ""}`}
                    disabled={!hypoUserObject || !hypoUserObject.id}
                  >
                    {isLiked ? (
                      <span className="heart-icon">&#x2665;</span>
                    ) : (
                      <span className="heart-icon">&#x2661;</span>
                    )}
                  </button>
                )}
              </div>
            </article>
          );
        }
        return null;
      })}
    </>
  );
};
