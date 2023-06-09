import { useState } from "react";
import { useEffect } from "react";
import "./chat.css";
import { ChatEdit } from "./ChatEdit";

export const ChatList = () => {
  // set up inital state for the chat and the updateChat setter function
  const [chats, updateChat] = useState([]);
  const hypoUser = localStorage.getItem("hypo_user");
  const hypoUserObject = JSON.parse(hypoUser);
  // put the fetch in the function so i once again can rerender it
  const getCustomerForms = () => {
    fetch(`http://localhost:8088/CustomerForms?_expand=user&_expand=symptom`)
      .then((response) => response.json())
      .then((formData) => {
        // update the chat with the form data
        updateChat(formData);
      });
  };
  // have our useEffect to ensure the the effect only runs once after the inital render to fetch the customer data

  useEffect(() => {
    getCustomerForms();
  }, []);

  // function for handling the delete
  //take in a parameter

  const handleDeleteChat = (chatId) => {
    // fetch the customerForms
    fetch(`http://localhost:8088/CustomerForms/${chatId}`, {
      //method is delete
      method: "DELETE",
    }).then(() => {
      // rerender the customerForms
      getCustomerForms();
    });
  };

  return (
    <>
      <h2>View the chat</h2>
      {chats.map((chat) => {
        return (
          <section className="chat" key={chat.id}>
            <div> user: {chat?.user?.name}</div>
            <div> symptom: {chat?.symptom?.name}</div>
            <div>{chat.description}</div>
            {hypoUserObject?.staff && (
              <button onClick={() => handleDeleteChat(chat.id)}>Delete</button>
            )}
            {hypoUserObject?.staff === false && (
              <button onClick={ChatEdit}>Edit Chat</button>
            )}
          </section>
        );
      })}
    </>
  );
};
