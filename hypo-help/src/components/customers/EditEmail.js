/*import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditEmail = () => {
  const { customerId } = useParams();

  const [customer, updateCustomer] = useState({
    name: "",
    isStaff: false,
    email: "",
  });

  const userList = () => {
    fetch(`http://localhost:8088/users?id=${customerId}`)
      .then((response) => response.json())
      .then((userData) => {
        const singleCustomer = userData[0];
        updateCustomer(singleCustomer);
      });
  };

  useEffect(() => {
    userList();
  }, []);

  const handleSaveButtonClick = () => {
    fetch(`http://localhost:8088/users/${customer.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => response.json())
      .then(() => {
        window.location.href = "/customerList";
      });
  };
  return (
    <form className="Customer-edit-Form">
      <h2 className="TipForm__title">Edit Customer</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Name</label>
          <textarea
            required
            autoFocus
            type="text"
            style={{
              height: "10rem",
            }}
            className="form-control"
            // bind the value to the tip.description
            value={customer.name}
            // on change we need to update of tip state, but we need to make a copy to do this
            // use the spread operator to make a copoy
            // set the copy.description to the evt targeted value
            onChange={(evt) => {
              const copy = { ...customer };
              copy.name = evt.target.value;
              // then update the tip
              updateCustomer(copy);
            }}
          >
            {customer.name}
          </textarea>
        </div>
      </fieldset>{" "}
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Email</label>
          <textarea
            required
            autoFocus
            type="text"
            style={{
              height: "10rem",
            }}
            className="form-control"
            // bind the value to the tip.description
            value={customer.email}
            // on change we need to update of tip state, but we need to make a copy to do this
            // use the spread operator to make a copoy
            // set the copy.description to the evt targeted value
            onChange={(evt) => {
              const copy = { ...customer };
              copy.email = evt.target.value;
              // then update the tip
              updateCustomer(copy);
            }}
          >
            {customer.email}
          </textarea>
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
};*/
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditEmail = () => {
  const { customerId } = useParams();

  const [customer, updateCustomer] = useState({
    name: "",
    isStaff: false,
    email: "",
  });

  const userList = () => {
    fetch(`http://localhost:8088/users?id=${customerId}`)
      .then((response) => response.json())
      .then((userData) => {
        const singleCustomer = userData[0];
        updateCustomer(singleCustomer);
      });
  };

  useEffect(() => {
    userList();
  }, []);

  const handleSaveButtonClick = () => {
    fetch(`http://localhost:8088/users/${customer.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => response.json())
      .then(() => {
        window.location.href = "/customerList";
      });
  };

  return (
    <form className="customer-edit-form">
      <h2 className="customer-edit-form__title">Edit Customer</h2>
      <fieldset className="customer-edit-form__fieldset">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <textarea
            required
            autoFocus
            id="name"
            className="form-control"
            value={customer.name}
            onChange={(evt) => {
              const copy = { ...customer };
              copy.name = evt.target.value;
              updateCustomer(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset className="customer-edit-form__fieldset">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <textarea
            required
            autoFocus
            id="email"
            className="form-control"
            value={customer.email}
            onChange={(evt) => {
              const copy = { ...customer };
              copy.email = evt.target.value;
              updateCustomer(copy);
            }}
          />
        </div>
      </fieldset>
      <button
        onClick={handleSaveButtonClick}
        className="btn btn-primary customer-edit-form__save-btn"
      >
        Save Edits
      </button>
    </form>
  );
};
