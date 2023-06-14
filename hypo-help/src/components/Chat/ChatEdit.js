import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export const ChatEdit = () => {
  //grab the tipId using useParams, so we can grab the tipId from the URL
  const { chatId } = useParams();
  //set up my inital state for the tip
  const [chat, updateChat] = useState({
    userId: "",
    symptomId: "",
    description: "",
  });
  // set up inital state for the symptoms
  const [symptoms, updateSymptom] = useState([]);

  // fetch my symptoms
  useEffect(() => {
    fetch(`http://localhost:8088/symptoms`)
      .then((response) => response.json())
      // update my symptoms with the symptom data
      .then((symptomData) => {
        updateSymptom(symptomData);
      });
  }, []);
  // variable for the useNavigate hook
  const navigate = useNavigate();
  // fetch my tips whos id matches the tipId from teh url
  useEffect(() => {
    fetch(`http://localhost:8088/customerForms?id=${chatId}`)
      .then((response) => response.json())
      // do the same thing with the tip data
      .then((customerFormData) => {
        const singleForm = customerFormData[0];
        updateChat(singleForm);
      });
  }, []);
  // create a function for my PUT methods when i click save edits
  const handleSaveButtonClick = (event) => {
    // have to prevent the default
    event.preventDefault();
    // fetch the tips / tip.id so we specifiy which exact tip we want to be updated
    fetch(`http://localhost:8088/customerForms/${chat.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      // stringify the tip
      body: JSON.stringify(chat),
    })
      .then((response) => response.json())
      // then we also want to fetch the symptom tip bc we need that to be updated with our choice as welll
      .then(() => {
        navigate("/viewchat");
      });
  };

  return (
    <form className="TipForm">
      <h2 className="TipForm__title">Edit your chat</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            required
            autoFocus
            type="text"
            style={{
              height: "10rem",
            }}
            className="form-control"
            // bind the value to the tip.description
            value={chat.description}
            // on change we need to update of tip state, but we need to make a copy to do this
            // use the spread operator to make a copoy
            // set the copy.description to the evt targeted value
            onChange={(evt) => {
              const copy = { ...chat };
              copy.description = evt.target.value;
              // then update the tip
              updateChat(copy);
            }}
          >
            {chat.description}
          </textarea>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Symptom</label>
          <select
            required
            autoFocus
            className="form-control"
            value={chat.symptomId}
            onChange={(evt) => {
              const copy = { ...chat };
              copy.symptomId = parseInt(evt.target.value);
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
      <button
        onClick={(evt) => handleSaveButtonClick(evt)}
        className="btn btn-primary"
      >
        Save Edits
      </button>
    </form>
  );
};
