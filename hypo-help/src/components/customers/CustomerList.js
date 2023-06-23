import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Customers.css";

export const CustomerList = () => {
  //set up state for the customers and updating them
  const [customers, updateCustomer] = useState([]);
  // putting it in a function so when something deletes it will automatically rerender the customers
  const customerList = () => {
    // fetch the customers
    fetch(`http://localhost:8088/users?isStaff=false`)
      .then((response) => response.json())
      .then((customerData) => {
        //update the customer with the customerData
        updateCustomer(customerData);
      });
  };

  useEffect(() => {
    customerList();
  }, []);
  // create a function to handle the delete button
  const handleDeleteButtonClick = (userId) => {
    //fetch the users parameter of userId so when were mapping over the customers we can put
    //the customer.id as an argument
    fetch(`http://localhost:8088/users/${userId}`, {
      //method is delete
      method: "DELETE",
    }).then(() => {
      //rerender the customerList
      customerList();
    });
  };
  // return a list of customers
  // map over the customers
  // give it a key so react doesnt yell at me
  // then have a button that when u click it runs the handleDeleteButtonClick passing in customer.id as an argument

  return (
    <>
      <h2 className="customer-title">List of all current users</h2>

      {customers.map((customer) => (
        <section className="customer-profile" key={customer.id}>
          <Link className="name" to={`/customers/editEmail/${customer.id}`}>
            Name: {customer.name}
          </Link>

          <div className="email">Email: {customer.email}</div>

          <button
            onClick={() => handleDeleteButtonClick(customer.id)}
            className="delete-button"
          >
            Remove User
          </button>
        </section>
      ))}
    </>
  );
};
