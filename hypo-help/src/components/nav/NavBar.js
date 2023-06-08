import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      <li className="navbar__item active">
        <Link className="navbar__link" to="/viewchat">
          View Chat
        </Link>
      </li>
      <li className="navbar__item active">
        <Link className="navbar__link" to="/chatform">
          Lets talk about it
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
    </ul>
  );
};
