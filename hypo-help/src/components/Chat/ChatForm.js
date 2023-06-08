import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ChatForm = () => {
  const [symptoms, updateSymptom] = useState([]);
  const [chat, updateChat] = useState({
    userId: "",
    symptomId: "",
    description: "",
  });

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

  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    const chatToSendToTheApi = {
      userId: hypoUserObject.id,
      symptomId: chat.symptomId,
      description: chat.description,
    };

    // TODO: Create the object to be saved to the API

    // TODO: Perform the fetch() to POST the object to the API
    fetch(`http://localhost:8088/CustomerForms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chatToSendToTheApi),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/viewchat");
      });
  };

  return (
    <form className="ChatForm">
      <h2 className="ticketForm__title">Let's talk about it</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Tell us about how your feeling</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder=""
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
          <label htmlFor="symptom">What symptom are you experiencing?</label>

          <select
            type="checkbox"
            value={chat.symptomId}
            onChange={(evt) => {
              const copy = { ...chat };
              copy.symptomId = evt.target.value;
              updateChat(copy);
            }}
          >
            <option value="0">Select a symptom</option>
            {symptoms.map((symptom) => {
              return (
                <option key={symptom.id} value={symptom.id}>
                  {symptom.name}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>
      <button onClick={handleSaveButtonClick} className="btn btn-primary">
        Submit Ticket
      </button>
    </form>
  );
};
