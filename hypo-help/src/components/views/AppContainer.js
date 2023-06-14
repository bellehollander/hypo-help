import { useState } from "react";
import { CustomerNavBar } from "../nav/CustomerNav";
import { EmployeeNavBar } from "../nav/EmployeeNav";
import { AdminViews } from "../views/AdminViews";
import { CustomerViews } from "../views/CustomerViews";
import "./NavBars.css";

export const AppContainer = () => {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  const hypoUser = localStorage.getItem("hypo_user");
  const hypoUserObject = JSON.parse(hypoUser);

  return (
    <div className={`app-container ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="background-image"></div>
      <div className="content-container">
        {hypoUserObject && hypoUserObject.staff ? (
          <EmployeeNavBar
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        ) : (
          <CustomerNavBar
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        )}

        {hypoUserObject && hypoUserObject.staff ? (
          <AdminViews isDarkMode={isDarkMode} />
        ) : (
          <CustomerViews isDarkMode={isDarkMode} />
        )}
      </div>
    </div>
  );
};

export const NavBar = () => {
  return <AppContainer />;
};
