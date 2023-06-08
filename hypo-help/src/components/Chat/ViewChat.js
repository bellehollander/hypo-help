import { useState } from "react";
import { useEffect } from "react";
import "./chat.css";

export const ChatList = () => {
  const [chats, updateChat] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8088/CustomerForms?_expand=user&_expand=symptom`)
      .then((response) => response.json())
      .then((formData) => {
        updateChat(formData);
      });
  }, []);

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
            </section>
          </>
        );
      })}
    </>
  );
};
