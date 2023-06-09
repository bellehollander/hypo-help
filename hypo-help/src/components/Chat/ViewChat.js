import { useState } from "react";
import { useEffect } from "react";
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
    <>
      <h2>View the chat</h2>
      {chats.map((chat) => {
        return (
          <>
            <article className="chats"></article>
            <section className="chat">
              <div> user: {chat?.user?.name}</div>
              <div> symptom: {chat?.symptom?.name}</div>
              <div>{chat.description}</div>
              {hypoUserObject?.staff && (
                <button onClick={() => handleDeleteChat(chat.id)}>
                  Delete
                </button>
              )}
            </section>
          </>
        );
      })}
    </>
  );
};
