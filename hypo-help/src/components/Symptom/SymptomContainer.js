import { TipList } from "../tips/TipList";
import { SymptomSearch } from "./SymptomSearch";
import { useState } from "react";

export const SymptomContainer = () => {
  const [searchTerms, setSearchTerms] = useState("");

  return (
    <>
      <SymptomSearch setTheTerms={setSearchTerms} />
      <TipList searchTerms={searchTerms} />
    </>
  );
};
