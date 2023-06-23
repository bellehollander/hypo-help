/*import { useEffect, useState } from "react";
import ".//Doctor.css";

export const ListOfDoctors = () => {
  const [doctorsField, updateDoctor] = useState([]);
  const [cityField, updateCity] = useState("");
  const [stateField, updateState] = useState("");
  const [zipCodeField, updateZipCode] = useState("");

  const handleSearch = () => {
    const searchParams = new URLSearchParams({
      city: cityField,
      state: stateField,
      postal_code: zipCodeField,
      version: "2.1",
    });

    const apiUrl = `https://npiregistry.cms.hhs.gov/api/?${searchParams}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((doctorData) => {
        console.log(doctorData);
        updateDoctor(doctorData.results);
      })
      .catch((error) => {
        console.error("Error fetching doctor data:", error);
      });
  };

  return (
    <>
      <div>
        <label>
          State:
          <input
            type="text"
            value={stateField}
            onChange={(e) => updateState(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          City:
          <input
            type="text"
            value={cityField}
            onChange={(e) => updateCity(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Zip Code:
          <input
            type="text"
            value={zipCodeField}
            onChange={(e) => updateZipCode(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="doctor-list">
        <h2>Doctors:</h2>
        {doctorsField.map((doctor, index) => {
          const addressesInCity = doctor.addresses.filter(
            (address) => address.city.toLowerCase() === cityField.toLowerCase()
          );

          if (
            !doctor.basic.first_name ||
            !doctor.basic.last_name ||
            addressesInCity.length === 0
          ) {
            return null; // Skip doctors without a name or without a matched address
          }

          return (
            <div className="doctor-card" key={index}>
              <h3>
                Dr. {doctor.basic.first_name} {doctor.basic.last_name}
              </h3>

              <h4>Address:</h4>
              {addressesInCity.map((address, addressIndex) => (
                <div
                  className={`address ${
                    addressIndex !== addressesInCity.length - 1
                      ? "address-divider"
                      : ""
                  }`}
                  key={addressIndex}
                >
                  <div>Street: {address.address_1}</div>
                  <div>City: {address.city}</div>
                  <div>State: {address.state}</div>
                  <div>Postal Code: {address.postal_code}</div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};
*/
import { useEffect, useState } from "react";
import "./Doctor.css";

export const ListOfDoctors = () => {
  const [doctorsField, updateDoctor] = useState([]);
  const [cityField, updateCity] = useState("");
  const [stateField, updateState] = useState("");
  const [zipCodeField, updateZipCode] = useState("");

  const handleSearch = () => {
    if (!cityField || !stateField || !zipCodeField) {
      alert("Please fill in all fields.");
      return;
    }

    const searchParams = new URLSearchParams({
      city: cityField,
      state: stateField,
      postal_code: zipCodeField,
      version: "2.1",
    });

    const apiUrl = `https://npiregistry.cms.hhs.gov/api/?${searchParams}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((doctorData) => {
        console.log(doctorData);
        updateDoctor(doctorData.results);
      })
      .catch((error) => {
        console.error("Error fetching doctor data:", error);
      });
  };

  return (
    <>
      <div>
        <div className="search-area">
          <label className="label">
            State:
            <input
              type="text"
              placeholder="Please enter state abbreviation.. ex: TN, LA...."
              value={stateField}
              onChange={(e) => updateState(e.target.value)}
              required
            />
          </label>

          <div>
            <label className="label">
              City:
              <input
                type="text"
                placeholder="Please enter your city.."
                value={cityField}
                onChange={(e) => updateCity(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label className="label">
              Zip Code:
              <input
                type="text"
                placeholder="Please enter yout zip code.."
                pattern="[0-9]{5}"
                value={zipCodeField}
                onChange={(e) => updateZipCode(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <button onClick={handleSearch} className="search-btn">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="doctor-list">
        <h2 className="doctor-header">Doctors:</h2>
        {doctorsField.map((doctor, index) => {
          const addressesInCity = doctor.addresses.filter(
            (address) => address.city.toLowerCase() === cityField.toLowerCase()
          );

          if (
            !doctor.basic.first_name ||
            !doctor.basic.last_name ||
            addressesInCity.length === 0
          ) {
            return null; // Skip doctors without a name or without a matched address
          }

          return (
            <div className="doctor-card" key={index}>
              <h3>
                Dr. {doctor.basic.first_name} {doctor.basic.last_name}
              </h3>

              <h4>Address:</h4>
              {addressesInCity.map((address, addressIndex) => (
                <div
                  className={`address ${
                    addressIndex !== addressesInCity.length - 1
                      ? "address-divider"
                      : ""
                  }`}
                  key={addressIndex}
                >
                  <div className="street">Street: {address.address_1}</div>
                  <div className="city">City: {address.city}</div>
                  <div className="state">State: {address.state}</div>
                  <div className="postal">
                    Postal Code: {address.postal_code}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};
