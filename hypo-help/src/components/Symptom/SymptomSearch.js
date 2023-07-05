import "./SymptomSearch.css";

export const SymptomSearch = ({ setTheTerms }) => {
  return (
    <div className="symptom-search">
      <input
        className="symptom-search__input"
        onChange={(changeEvnt) => {
          setTheTerms(changeEvnt.target.value);
        }}
        type="text"
        placeholder="Search for a symptom..."
      />
    </div>
  );
};
