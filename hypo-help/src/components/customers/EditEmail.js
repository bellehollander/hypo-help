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
      <h2 className="customer-edit-form__title">Edit User Information</h2>
      <fieldset className="customer-edit-form__fieldset">
        <div className="form-group-customerEdit">
          <label htmlFor="name" className="name">
            Name
          </label>
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
        <div className="form-group-customerEdit">
          <label htmlFor="email" className="edit">
            Email
          </label>
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
