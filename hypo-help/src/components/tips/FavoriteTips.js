import { useState, useEffect } from "react";
import "./tips.css";

export const FavoritedTips = () => {
  const [likes, updateLikes] = useState([]);
  const [symptomTip, updateSymptomTip] = useState([]);

  const hypoUser = localStorage.getItem("hypo_user");
  const hypoUserObject = JSON.parse(hypoUser);

  useEffect(() => {
    fetch(`http://localhost:8088/likes?_expand=tip`)
      .then((response) => response.json())
      .then((likeData) => {
        updateLikes(likeData);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8088/symptomTip?_expand=symptom`)
      .then((response) => response.json())
      .then((symptomTipData) => {
        updateSymptomTip(symptomTipData);
      });
  }, []);

  return (
    <>
      <h2 className="tip-header">Your Favorite Tips</h2>
      {likes.map((like) => {
        if (like.userId === hypoUserObject.id) {
          const associatedSymptom = symptomTip.find(
            (st) => st.tipId === like.tip.id
          );

          if (associatedSymptom) {
            return (
              <div key={like.tip.id} className="tip">
                <div className="symptom">
                  Symptom: {associatedSymptom.symptom.name}
                </div>
                <p className="description">{like.tip.description}</p>
              </div>
            );
          }
        }
        return null;
      })}
    </>
  );
};
