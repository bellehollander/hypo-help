export const SymptomSearch = ({ setTheTerms }) => {
  return (
    <div>
      {" "}
      <input
        onChange={(changeEvnt) => {
          setTheTerms(changeEvnt.target.value);
        }}
        type="text"
        placeholder="Enter your symptom"
      />{" "}
    </div>
  );
};
