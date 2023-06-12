import "./User.css";

export const UserHello = () => {
  const hypoUser = localStorage.getItem("hypo_user");
  const hypoUserObject = JSON.parse(hypoUser);
  const hypoUserName = hypoUserObject.name;

  return <h3 className="user-hello"> Hello {hypoUserName}! </h3>;
};
