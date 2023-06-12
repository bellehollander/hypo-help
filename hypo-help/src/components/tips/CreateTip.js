import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./CreateTip.css";
export const CreateTip = () => {
  const navigate = useNavigate();
  const hypoUser = localStorage.getItem("hypo_user");
  const hypoUserObject = JSON.parse(hypoUser);

  // set up inital state for the tip and the setter function for updateing the tip
  const [tip, updateTip] = useState({
    description: "",
    userId: "",
  });
  //set up inital state for the symptomTip and updating the symptomTip
  const [symptomTip, updateSymptomTip] = useState({
    tipId: "",
    symptomId: "",
  });
  // set up inital state for the symptoms and updateing the symptoms
  const [symptoms, updateSymptom] = useState([]);
  // fetch the symptoms and up data the symptoms intital state with the data
  useEffect(() => {
    fetch(`http://localhost:8088/symptoms`)
      .then((response) => response.json())
      .then((symptomData) => {
        updateSymptom(symptomData);
      });
  }, []);

  // set up a function to run when the save button is clicked
  const handleEmployeeSaveButton = (event) => {
    // need to prevent the default
    event.preventDefault();
    // create the tip we want to send to the api
    const tipToSendToTheApi = {
      description: tip.description,
      userId: hypoUserObject.id,
    };
    // fetch the tips
    fetch(`http://localhost:8088/tips`, {
      //method is post
      method: "POST",
      //need to specify the header
      headers: { "Content-Type": "application/json" },
      // we cannot send just an object to json so we need to stringify it
      body: JSON.stringify(tipToSendToTheApi),
    })
      //then we capture the response from the api and set make is json so that
      //its a javascript object
      .then((response) => response.json())
      // then we capture that response
      .then((tipResponse) => {
        // create a an object for a symptom tip to send to the API embeded in the fetch call
        // for the tipId we just need to capture that tipResponse.id as the id
        //set up the symptomTipToSendToTheApi
        const symptomTipToSendToTheApi = {
          tipId: tipResponse.id,
          symptomId: symptomTip.symptomId,
        };
        // then we can fetch symptomTips
        fetch(`http://localhost:8088/symptomTip`, {
          //method is post
          method: "POST",
          //need to specify the header
          headers: { "Content-Type": "application/json" },
          // we cannot send just an object to json so we need to stringify it
          body: JSON.stringify(symptomTipToSendToTheApi),
        })
          .then((response) => response.json())
          .then(() => {
            // then we want to navigate right back to the all the tips once it is created
            navigate("/viewAllTips");
          });
      });
  };

  return (
    <form className="ProductForm">
      <h2 className="ProductForm__title">New Tip</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Type your tip"
            value={tip.description}
            onChange={(evt) => {
              // we need to create a copy of the tip obj so we arent modifying the original object
              const copy = { ...tip };
              // then set the description property to the evnt targeteds value(so whatever were going to be typing)
              copy.description = evt.target.value;

              // then we need to invoke the setter function passing in the copy
              updateTip(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="type"> Symptoms: </label>
          <select
            required
            className="form-control"
            value={symptomTip.symptomId}
            onChange={(evt) => {
              // create a copy of the symptomTop
              const copy = { ...symptomTip };
              // copy.symptomId = evt targeted value
              copy.symptomId = evt.target.value;
              // get the setter function and pass in the copy
              updateSymptomTip(copy);
            }}
          >
            <option value="">Select a Symptom</option>
            {symptoms.map((symptom) => (
              <option key={symptom.id} value={symptom.id}>
                {symptom.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button
        onClick={(clickEvent) => {
          // on click we want the handleSaveButtonClick function to run
          handleEmployeeSaveButton(clickEvent);
        }}
        className="btn btn-primary"
      >
        Submit Tip
      </button>
    </form>
  );
};
