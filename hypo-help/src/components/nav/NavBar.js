import { CustomerNavBar } from "./CustomerNav";
import { EmployeeNavBar } from "./EmployeeNav";
import "./NavBar.css";

export const NavBar = () => {
  const hypoUser = localStorage.getItem("hypo_user");
  const hypoUserObject = JSON.parse(hypoUser);
  if (hypoUserObject.staff) {
    return <EmployeeNavBar />;
  } else {
    return <CustomerNavBar />;
  }
};
