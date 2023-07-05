import { useState } from "react";
import { CustomerNavBar } from "../nav/CustomerNav";
import { EmployeeNavBar } from "../nav/EmployeeNav";
import { AdminViews } from "../views/AdminViews";
import { CustomerViews } from "../views/CustomerViews";
import { useEffect } from "react";
import "./NavBars.css";

export const AppContainer = () => {
  const [isDarkMode, setDarkMode] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const hypoUser = localStorage.getItem("hypo_user");
  const hypoUserObject = JSON.parse(hypoUser);
  const [blockedUsers, setBlockedUsers] = useState([]);

  // Function to add a user to the blocked users list
  const blockUser = (userId) => {
    setBlockedUsers((prevBlockedUsers) => [...prevBlockedUsers, userId]);
  };

  // Function to remove a user from the blocked users list
  const unblockUser = (userId) => {
    setBlockedUsers((prevBlockedUsers) =>
      prevBlockedUsers.filter((blockedUser) => blockedUser !== userId)
    );
  };

  useEffect(() => {
    // Fetch message count from the server or local storage
    MessageSetter();
  }, [messageCount]);

  const MessageSetter = () => {
    fetch(`http://localhost:8088/messages?userId2=${hypoUserObject.id}`)
      .then((response) => response.json())
      .then((messageData) => {
        setMessageCount(messageData.length);
      });
  };

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

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
            messageCount={messageCount}
          />
        )}

        {hypoUserObject && hypoUserObject.staff ? (
          <AdminViews isDarkMode={isDarkMode} />
        ) : (
          <CustomerViews
            isDarkMode={isDarkMode}
            messageCountSet={setMessageCount}
            blockedUsers={blockedUsers}
            blockUser={blockUser}
            unblockUser={unblockUser}
          />
        )}
      </div>
    </div>
  );
};

export const NavBar = () => {
  return <AppContainer />;
};
