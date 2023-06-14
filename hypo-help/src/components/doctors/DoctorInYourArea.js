import { useEffect, useState } from "react";

export const ListOfDoctors = () => {
  const [doctors, updateDoctor] = useState([]);

  useEffect(() => {
    fetch("")
      .then((response) => response.json())
      .then((doctorData) => {
        updateDoctor(doctorData);
      });
  }, []);

  return <></>;
};
