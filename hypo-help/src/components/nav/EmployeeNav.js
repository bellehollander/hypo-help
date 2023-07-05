import { Link, useNavigate } from "react-router-dom";

export const EmployeeNavBar = ({ isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();

  return (
    <div className="navbar__links">
      <ul className="navbar">
        <li className="navbar__item active">
          <Link className="navbar__link" to="/">
            Home
          </Link>
        </li>
        <li className="navbar__item active">
          <Link className="navbar__link" to="/viewchat">
            View Chat
          </Link>
        </li>
        <li className="navbar__item active">
          <Link className="navbar__link" to="/viewAllTips">
            View All Tips
          </Link>
        </li>{" "}
        <li className="navbar__item active">
          <Link className="navbar__link" to="/createNewTip">
            Create a tip
          </Link>
        </li>
        <li className="navbar__item active">
          <Link className="navbar__link" to="/customerList">
            View users
          </Link>
        </li>
        {localStorage.getItem("hypo_user") ? (
          <li className="navbar__item navbar__logout">
            <Link
              className="navbar__link"
              to=""
              onClick={() => {
                localStorage.removeItem("hypo_user");
                navigate("/", { replace: true });
              }}
            >
              Logout
            </Link>
          </li>
        ) : (
          ""
        )}
        <li className="navbar__item navbar__dark-mode-toggle">
          <div className="dark-mode-toggle">
            <button onClick={toggleDarkMode}>{isDarkMode ? "💡" : "💡"}</button>
          </div>
        </li>
      </ul>
    </div>
  );
};
