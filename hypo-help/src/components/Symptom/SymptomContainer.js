import { TipList } from "../tips/TipList";
import { SymptomSearch } from "./SymptomSearch";
import { useState } from "react";
// need to create a parent container bc two child componets cannot share state without one
export const SymptomContainer = () => {
  const [searchTerms, setSearchTerms] = useState("");

  return (
    <>
      <SymptomSearch setTheTerms={setSearchTerms} />
      <TipList searchTerms={searchTerms} />
    </>
  );
};
