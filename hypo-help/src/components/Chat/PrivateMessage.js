import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./chat.css";

export const PrivateMessagePage = ({ blockedUsers }) => {
  const [message, setMessage] = useState("");
  const hypoUser = localStorage.getItem("hypo_user");
  const hypoUserObject = JSON.parse(hypoUser);
  const { userId } = useParams();

  const handleSendMessage = (e) => {
    e.preventDefault();
    const messageObject = {
      userId: hypoUserObject.id,
      message: message,
      timestamp: Date.now(),
      userId2: parseInt(userId),
    };

    fetch("http://localhost:8088/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageObject),
    })
      .then((response) => response.json())
      .then(() => {
        window.alert("Message sent!");
        window.location.href = "/viewChat";
      });
  };

  return (
    <div className="compose-message-container">
      <h2 className="compose-message-header">Compose Message</h2>
      <form className="compose-message-form" onSubmit={handleSendMessage}>
        <textarea
          className="compose-message-textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
          required
        ></textarea>
        <button className="compose-message-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};
