import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./tips.css";
// create our function taking in the prop of search terms
export const TipList = ({ searchTerms }) => {
  // we need 2 states
  //one state variable for tips
  //one for the symptomTip, both have an inital value of an empty array
  const [tips, updateTip] = useState([]);
  const [symptomTip, updateSymptomTip] = useState([]);

  const hypoUser = localStorage.getItem("hypo_user");
  const hypoUserObject = JSON.parse(hypoUser);

  const tipList = () => {
    fetch(`http://localhost:8088/tips?_expand=user`)
      .then((response) => response.json())
      // then grab the tipData and update the tips with it
      .then((tipData) => {
        updateTip(tipData);
      });
  };

  useEffect(() => {
    tipList();
  }, []);

  useEffect(() => {
    // fetch the symptomTips with the symptom name expanded
    fetch(`http://localhost:8088/symptomTip?_expand=symptom`)
      .then((response) => response.json())
      // then grab that data and update the symptomTip with it
      .then((symptomTipData) => {
        updateSymptomTip(symptomTipData);
      });
  }, []);

  const handleDeleteTip = (tipId) => {
    fetch(`http://localhost:8088/tips/${tipId}`, {
      method: "DELETE",
    }).then(() => {
      tipList();
    });
  };

  // then we need to map over the tips
  //set up a variable to store the correct symptomTip
  // check if the symptom.tipId === tip.id
  //then create a variable for the syptomName and we set it to the name of the symptom,
  // if there is any- if not an empty string
  // then we check if the symptomName.toLowerCase starts with the searchTerms.toLowerCase,
  // if it does match and seachTerms is true (there is something) we return our jsx dependent on what our user types in
  // else if the search terms are ! true, just return the jsx for all the tips

  return (
    <>
      <section>hypo-help tips</section>
      {tips.map((tip) => {
        const matchingSymptomTip = symptomTip.find(
          (symptom) => symptom.tipId === tip.id
        );

        const symptomName = matchingSymptomTip?.symptom?.name || "";

        if (
          searchTerms &&
          symptomName.toLowerCase().startsWith(searchTerms.toLowerCase())
        ) {
          return (
            <article className="tip" key={tip.id}>
              <div className="symptom">Symptom: {symptomName}</div>
              <div className="description">{tip.description}</div>
              <div className="admin">Admin: {tip?.user?.name}</div>
            </article>
          );
        } else {
          if (!searchTerms) {
            const isCurrentUserTip = hypoUserObject?.id === tip.userId;
            return (
              <article className="tip" key={tip.id}>
                {isCurrentUserTip && (
                  <Link
                    to={`/viewAllTip/${tip.id}/editTip`}
                    className="edit-link"
                  >
                    Edit
                  </Link>
                )}
                <div className="symptom">Symptom: {symptomName}</div>
                <div className="description">{tip.description}</div>
                <div className="admin">Admin: {tip?.user?.name}</div>
                {hypoUserObject?.staff && (
                  <button
                    onClick={() => handleDeleteTip(tip.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                )}
              </article>
            );
          }
        }
      })}
    </>
  );
};
