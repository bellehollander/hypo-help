import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";

export const CustomerNavBar = ({
  isDarkMode,
  toggleDarkMode,
  messageCount,
}) => {
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
          <Link className="navbar__link" to="/inbox">
            <span className="navbar__link-text">Inbox </span>
            {messageCount > 0 && (
              <span className="message-count">
                <span className="fa-layers fa-fw">
                  <FontAwesomeIcon icon={faComment} className="has-messages" />
                  <span className="fa-layers-text">{messageCount}</span>
                </span>
              </span>
            )}
          </Link>
        </li>

        <li className="navbar__item active">
          <Link className="navbar__link" to="/chatform">
            Lets talk about it
          </Link>
        </li>
        <li className="navbar__item active">
          <Link className="navbar__link" to="/viewAllTips">
            Hypo-Help Tips
          </Link>
        </li>
        <li className="navbar__item active">
          <Link className="navbar__link" to="/favoriteList">
            Favorite Tips
          </Link>
        </li>
        <li className="navbar__item active">
          <Link className="navbar__link" to="/doctorList">
            find a healthcare provider
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
        <div className="dark-mode-toggle">
          <button onClick={toggleDarkMode}>{isDarkMode ? "🌞" : "🌙"}</button>
        </div>
      </ul>
    </div>
  );
};
