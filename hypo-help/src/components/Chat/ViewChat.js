import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./chat.css";

export const ChatList = () => {
  const [chats, updateChat] = useState([]);
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const [replyMap, setReplyMap] = useState({});

  const hypoUser = localStorage.getItem("hypo_user");
  const hypoUserObject = JSON.parse(hypoUser);

  const getCustomerForms = () => {
    fetch(`http://localhost:8088/CustomerForms?_expand=user&_expand=symptom`)
      .then((response) => response.json())
      .then((formData) => {
        updateChat(formData);
      });
  };

  const fetchComments = () => {
    fetch(`http://localhost:8088/reply?_expand=user`)
      .then((response) => response.json())
      .then((commentsData) => {
        const commentsByChat = {};
        commentsData.forEach((comment) => {
          const chatId = comment.chatId;
          if (commentsByChat[chatId]) {
            commentsByChat[chatId].push(comment);
          } else {
            commentsByChat[chatId] = [comment];
          }
        });
        setComments(commentsByChat);
      });
  };

  const fetchLikes = () => {
    fetch(`http://localhost:8088/chatLikes`)
      .then((response) => response.json())
      .then((likesData) => {
        const likesByChat = {};
        likesData.forEach((like) => {
          const chatId = like.chatId;
          if (likesByChat[chatId]) {
            likesByChat[chatId].push(like);
          } else {
            likesByChat[chatId] = [like];
          }
        });
        setLikes(likesByChat);
      });
  };

  useEffect(() => {
    getCustomerForms();
    fetchComments();
    fetchLikes();
  }, []);

  // ...

  const handleDeleteChat = (chatId) => {
    // Fetch the chat data
    fetch(`http://localhost:8088/CustomerForms/${chatId}`, {
      method: "DELETE",
    })
      .then(() => {
        // Fetch the replies for the chat
        fetch(`http://localhost:8088/reply?chatId=${chatId}`)
          .then((response) => response.json())
          .then((replies) => {
            // Delete each reply
            const deletePromises = replies.map((reply) =>
              fetch(`http://localhost:8088/reply/${reply.id}`, {
                method: "DELETE",
              })
            );
            return Promise.all(deletePromises);
          });
      })
      .then(() => {
        getCustomerForms();
        fetchComments();
      });
  };

  const handleReplySubmit = (chatId) => {
    const replyText = replyMap[chatId];

    const replyData = {
      userId: hypoUserObject.id,
      chatId: chatId,
      replyText: replyText,
    };

    fetch(`http://localhost:8088/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(replyData),
    })
      .then((response) => response.json())
      .then(() => {
        getCustomerForms();
        fetchComments();
        setReplyMap((prevMap) => {
          const updatedMap = { ...prevMap };
          delete updatedMap[chatId];
          return updatedMap;
        });
      });
  };

  const handleReplyChange = (chatId, event) => {
    const { value } = event.target;

    setReplyMap((prevMap) => ({
      ...prevMap,
      [chatId]: value,
    }));
  };

  const handleDeleteComment = (commentId) => {
    fetch(`http://localhost:8088/reply/${commentId}`, {
      method: "DELETE",
    }).then(() => {
      fetchComments();
    });
  };

  const handleLike = (chatId) => {
    const likeData = {
      userId: hypoUserObject.id,
      chatId: chatId,
    };

    fetch(`http://localhost:8088/chatLikes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(likeData),
    })
      .then((response) => response.json())
      .then(() => {
        fetchLikes();
      });
  };

  const handleUnlike = (chatId) => {
    const likeKey = `${chatId}-${hypoUserObject.id}`;
    const likeId = likes[chatId]?.find(
      (like) => like.userId === hypoUserObject.id
    )?.id;

    if (likeId) {
      fetch(`http://localhost:8088/chatLikes/${likeId}`, {
        method: "DELETE",
      }).then(() => {
        fetchLikes();
      });
    }
  };

  return (
    <div className="chat-container">
      <h2 className="view-chat">View the chat</h2>
      {chats.map((chat) => {
        const isCurrentUser = hypoUserObject?.id === chat?.user?.id;
        const isStaff = hypoUserObject?.staff;
        const reply = replyMap[chat.id] || "";
        const chatComments = comments[chat.id] || [];
        const chatLikes = likes[chat.id] || [];
        const isLiked = chatLikes.some(
          (like) => like.userId === hypoUserObject.id
        );

        const likeCount = chatLikes.length;

        return (
          <section className="chat" key={chat.id}>
            <div className="user">User: {chat?.user?.name}</div>
            <div className="symptom">Symptom: {chat?.symptom?.name}</div>
            <div className="description">{chat.description}</div>

            <div className="like-section">
              <button
                onClick={() =>
                  isLiked ? handleUnlike(chat.id) : handleLike(chat.id)
                }
                className={`like-button ${isLiked ? "liked" : ""}`}
              >
                {isLiked ? (
                  <span className="heart-icon">&#x2665;</span>
                ) : (
                  <span className="heart-icon">&#x2661;</span>
                )}
                <span className="like-count">{likeCount}</span>
              </button>
            </div>

            {chatComments.map((comment) => (
              <div key={comment.id} className="comment">
                <span className="comment-user">
                  {comment?.user?.name} replied:
                </span>
                <span className="comment-text">{comment.replyText}</span>
                {comment.userId === hypoUserObject.id && (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="delete-comment-button"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}

            {isStaff && (
              <>
                <div className="reply-section">
                  <input
                    type="text"
                    value={reply}
                    onChange={(e) => handleReplyChange(chat.id, e)}
                    className="reply-input"
                    placeholder="Comment"
                  />
                  <button
                    onClick={() => handleReplySubmit(chat.id)}
                    className="submit-button"
                  >
                    Submit
                  </button>
                </div>
                <button
                  onClick={() => handleDeleteChat(chat.id)}
                  className="delete-button"
                >
                  Delete Chat
                </button>
              </>
            )}
            {isCurrentUser && !isStaff && (
              <>
                <Link to={`/chat/edit/${chat.id}`} className="edit-link">
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteChat(chat.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </>
            )}
          </section>
        );
      })}
    </div>
  );
};
