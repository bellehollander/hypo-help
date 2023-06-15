import { Outlet, Route, Routes } from "react-router-dom";
import { ChatList } from "../Chat/ViewChat";
import { CreateTip } from "../tips/CreateTip";
import { TipList } from "../tips/TipList";
import { UserHello } from "../auth/Userhello";
import { CustomerList } from "../customers/CustomerList";
import { TipEdit } from "../tips/TipEdit";
import "./views.css";
import { EditEmail } from "../customers/EditEmail";
import logo from "./hypoLogo2.png";
import darkLogo from "./hypoLogoDark.png";

export const AdminViews = ({ isDarkMode }) => {
  const logoSource = isDarkMode ? darkLogo : logo;
  return (
    <div className="app-container">
      <div className="background-image"></div>

      <div className="content-container">
        <div className="hypo-header">
          <h1 className="hypo-title">HYPO-HELP</h1>
          <div className="hypo-image">
            <img src={logoSource} alt="cloud-logo"></img>
          </div>
          <div className="hypo-subtitle">
            Helping those with health anxiety, one less scary google search at a
            time.
          </div>
        </div>

        <Routes>
          <Route path="/viewchat" element={<ChatList />} />
          <Route path="/viewAllTips" element={<TipList />} />
          <Route path="/createNewTip" element={<CreateTip />} />
          <Route path="/customerList" element={<CustomerList />} />
          <Route path="/viewAllTip/:tipId/editTip" element={<TipEdit />} />
          <Route
            path="customers/editEmail/:customerId"
            element={<EditEmail />}
          />
          <Route path="/" className="user-hello" element={<UserHello />} />
        </Routes>

        <Outlet />
      </div>
    </div>
  );
};
