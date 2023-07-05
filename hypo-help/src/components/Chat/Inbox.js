import { useState, useEffect } from "react";

export const Inbox = ({ messageCountSet }) => {
  const [receivedMessages, setReceivedMessages] = useState([]);

  const hypoUser = localStorage.getItem("hypo_user");
  const hypoUserObject = JSON.parse(hypoUser);

  useEffect(() => {
    fetchReceivedMessages();
  }, []);

  useEffect(() => {
    messageCountSet(receivedMessages.length);
  }, [receivedMessages]);

  const fetchReceivedMessages = () => {
    fetch(
      `http://localhost:8088/messages?_expand=user&userId2=${hypoUserObject.id}`
    )
      .then((response) => response.json())
      .then((messageData) => {
        setReceivedMessages(messageData);
      })
      .catch((error) => {
        console.error("Error fetching received messages:", error);
      });
  };
  const handleReply = (message) => {
    const replyMessage = prompt("Enter your reply:");

    if (replyMessage) {
      const newMessage = {
        userId: hypoUserObject.id,
        message: replyMessage,
        timestamp: new Date().getTime(),
        userId2: message.userId,
      };

      fetch("http://localhost:8088/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      })
        .then((response) => response.json())
        .then(() => {
          window.alert("Message sent!");
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    }
  };

  const handleDeleteButtonClick = (messageId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (confirmDelete) {
      fetch(`http://localhost:8088/messages/${messageId}`, {
        method: "DELETE",
      })
        .then(() => {
          const updatedMessages = receivedMessages.filter(
            (message) => message.id !== messageId
          );
          setReceivedMessages(updatedMessages);
        })
        .catch((error) => {
          console.error("Error deleting message:", error);
        });
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div className="inbox-container">
      <h2 className="inbox-header">Your Messages</h2>
      <div className="messages-container">
        {receivedMessages.length > 0 ? (
          <div className="received-messages">
            {receivedMessages.map((message) => (
              <div key={message.id} className="message">
                <div className="message-sender">
                  {message?.user?.name} replied to your chat:
                </div>
                <div className="message-content">{message.message}</div>
                <div className="message-time">
                  {formatTimestamp(message?.timestamp)}
                </div>
                <button
                  className="reply-button"
                  onClick={() => handleReply(message)}
                >
                  Reply
                </button>
                <button
                  className="delete-message"
                  onClick={() => handleDeleteButtonClick(message.id)}
                >
                  Delete Message
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-messages">You haven't received any messages.</div>
        )}
      </div>
    </div>
  );
};
