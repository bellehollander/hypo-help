export const UserHello = () => {
  const hypoUser = localStorage.getItem("hypo_user");
  const hypoUserObject = JSON.parse(hypoUser);
  const hypoUserName = hypoUserObject.name;

  return <h3> Hello {hypoUserName}! </h3>;
};
