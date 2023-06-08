import { AdminViews } from "./AdminViews";
import { CustomerViews } from "./CustomerViews";

export const ApplicationViews = () => {
  const hypoUser = localStorage.getItem("hypo_user");
  const hypoUserObject = JSON.parse(hypoUser);
  if (hypoUserObject.staff) {
    return <AdminViews />;
  } else {
    return <CustomerViews />;
  }
};
