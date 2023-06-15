import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export const TipEdit = () => {
  //grab the tipId using useParams, so we can grab the tipId from the URL
  const { tipId } = useParams();
  //set up my inital state for the tip
  const [tip, updateTip] = useState({
    userId: "",
    description: "",
  });
  // set up inital state for the symptoms
  const [symptoms, updateSymptom] = useState([]);
  //set up inital state for the symptomTips
  const [symptomTips, updateSymptomTip] = useState({
    tipId: "",
    symptomId: "",
  });
  // fetch the symptomTip whos tipId = tipId in the url
  useEffect(() => {
    fetch(`http://localhost:8088/symptomTip?tipId=${tipId}`)
      .then((response) => response.json())
      // asign that one at position [0] to my singleSymptomTip variable
      .then((symptomTip) => {
        const singleSymptomTip = symptomTip[0];
        // update my symptomTip with the single symptom tip
        updateSymptomTip(singleSymptomTip);
      });
  }, []);
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
    fetch(`http://localhost:8088/tips?id=${tipId}`)
      .then((response) => response.json())
      // do the same thing with the tip data
      .then((tipData) => {
        const singleTip = tipData[0];
        updateTip(singleTip);
      });
  }, []);
  // create a function for my PUT methods when i click save edits
  const handleSaveButtonClick = (event) => {
    // have to prevent the default
    event.preventDefault();
    // fetch the tips / tip.id so we specifiy which exact tip we want to be updated
    fetch(`http://localhost:8088/tips/${tip.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      // stringify the tip
      body: JSON.stringify(tip),
    })
      .then((response) => response.json())
      // then we also want to fetch the symptom tip bc we need that to be updated with our choice as welll
      .then(() => {
        // we do the /{symptomTips.id} so that the exact tip we want to be updated is specifeied
        fetch(`http://localhost:8088/symptomTip/${symptomTips.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          //stringify the symptomTips
          body: JSON.stringify(symptomTips),
        })
          .then((response) => response.json())
          .then(() => {
            // finally after its all updated we just want to be navigated back to all the tips
            navigate("/viewAllTips");
          });
      });
  };

  return (
    <form className="TipForm">
      <h2 className="TipForm__title">Tip</h2>
      <fieldset>
        <div className="form-group TipForm__container">
          <label htmlFor="description" className="edit-description">
            Description:
          </label>
          <textarea
            required
            autoFocus
            type="text"
            style={{
              height: "10rem",
            }}
            className="form-control"
            // bind the value to the tip.description
            value={tip.description}
            // on change we need to update of tip state, but we need to make a copy to do this
            // use the spread operator to make a copoy
            // set the copy.description to the evt targeted value
            onChange={(evt) => {
              const copy = { ...tip };
              copy.description = evt.target.value;
              // then update the tip
              updateTip(copy);
            }}
          >
            {tip.description}
          </textarea>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group TipForm__container">
          <label htmlFor="description" className="edit-Symptom">
            Symptom:
          </label>
          <select
            required
            autoFocus
            className="form-control"
            value={symptomTips.symptomId}
            onChange={(evt) => {
              const copy = { ...symptomTips };
              copy.symptomId = parseInt(evt.target.value);
              updateSymptomTip(copy);
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
