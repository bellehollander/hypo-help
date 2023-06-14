import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./chat.css";

export const ChatForm = () => {
  // set up inital state for the symptoms
  const [symptoms, updateSymptom] = useState([]);
  //set up inital state for the chat
  const [chat, updateChat] = useState({
    userId: "",
    symptomId: "",
    description: "",
  });
  // useEffect to fetch the symptoms and update the symptoms array
  useEffect(() => {
    fetch(`http://localhost:8088/symptoms`)
      .then((response) => response.json())
      .then((symptomArray) => {
        updateSymptom(symptomArray);
      });
  }, []);

  const navigate = useNavigate();
  const hypoUser = localStorage.getItem("hypo_user");
  const hypoUserObject = JSON.parse(hypoUser);
  // function for when the button is clicked
  const handleSaveButtonClick = (event) => {
    event.preventDefault();
    // create object to senf to the api
    // fill with correct values
    const chatToSendToTheApi = {
      userId: hypoUserObject.id,
      symptomId: chat.symptomId,
      description: chat.description,
    };

    // fetch the customerForms bc thats where were sendin this chat
    fetch(`http://localhost:8088/CustomerForms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chatToSendToTheApi),
    })
      .then((response) => response.json())
      .then(() => {
        // make sure we navigate back to viewchat
        navigate("/viewchat");
      });
  };

  return (
    <form className="chat-form">
      <h2 className="chat-form__title">Let's Talk About It</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="description" className="how-your-feeling">
            Tell us how you're feeling:
          </label>
          <textarea
            required
            autoFocus
            className="form-control"
            placeholder="Enter your message here"
            value={chat.description}
            onChange={(evt) => {
              const copy = { ...chat };
              copy.description = evt.target.value;
              updateChat(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="symptom" className="symptom-select">
            Select the symptom you're experiencing:
          </label>
          <select
            className="form-control"
            value={chat.symptomId}
            onChange={(evt) => {
              const copy = { ...chat };
              copy.symptomId = evt.target.value;
              updateChat(copy);
            }}
          >
            <option value="">Select a symptom</option>
            {symptoms.map((symptom) => (
              <option key={symptom.id} value={symptom.id}>
                {symptom.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button onClick={handleSaveButtonClick} className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
