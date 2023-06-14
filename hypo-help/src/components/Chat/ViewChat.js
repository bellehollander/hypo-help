import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./chat.css";

export const ChatList = () => {
  const [chats, updateChat] = useState([]);
  const hypoUser = localStorage.getItem("hypo_user");
  const hypoUserObject = JSON.parse(hypoUser);

  const getCustomerForms = () => {
    fetch(`http://localhost:8088/CustomerForms?_expand=user&_expand=symptom`)
      .then((response) => response.json())
      .then((formData) => {
        updateChat(formData);
      });
  };

  useEffect(() => {
    getCustomerForms();
  }, []);

  const handleDeleteChat = (chatId) => {
    fetch(`http://localhost:8088/CustomerForms/${chatId}`, {
      method: "DELETE",
    }).then(() => {
      getCustomerForms();
    });
  };

  return (
    <div className="chat-container">
      <h2 className="view-chat">View the chat</h2>
      {chats.map((chat) => {
        const isCurrentUser = hypoUserObject?.id === chat?.user?.id;
        const isStaff = hypoUserObject?.staff;

        return (
          <section className="chat" key={chat.id}>
            <div className="user">User: {chat?.user?.name}</div>
            <div className="symptom">Symptom: {chat?.symptom?.name}</div>
            <div className="description">{chat.description}</div>
            {isStaff && (
              <button
                onClick={() => handleDeleteChat(chat.id)}
                className="delete-button"
              >
                Delete
              </button>
            )}
            {isCurrentUser && !isStaff && (
              <Link to={`/chat/edit/${chat.id}`} className="edit-link">
                Edit
              </Link>
            )}
            {isCurrentUser && !isStaff && (
              <button
                onClick={() => handleDeleteChat(chat.id)}
                className="delete-button"
              >
                Delete
              </button>
            )}
          </section>
        );
      })}
    </div>
  );
};
