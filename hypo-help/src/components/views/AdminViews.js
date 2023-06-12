import { Outlet, Route, Routes } from "react-router-dom";
import { ChatList } from "../Chat/ViewChat";
import { CreateTip } from "../tips/CreateTip";
import { TipList } from "../tips/TipList";
import { UserHello } from "../auth/Userhello";
import { CustomerList } from "../customers/CustomerList";
import { TipEdit } from "../tips/TipEdit";
import "./views.css";

export const AdminViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <div className="hypo-header">
              <h1 className="hypo-title">HYPO-HELP</h1>
              <div className="hypo-subtitle">
                Helping those with health anxiety, one less scary google search
                at a time.
              </div>
            </div>

            <Outlet />
          </>
        }
      >
        <Route path="/viewchat" element={<ChatList />} />
        <Route path="/viewAllTips" element={<TipList />} />
        <Route path="/createNewTip" element={<CreateTip />} />
        <Route path="/customerList" element={<CustomerList />} />
        <Route path="/viewAllTip/:tipId/editTip" element={<TipEdit />} />
        <Route path="/" element={<UserHello />} />
      </Route>
    </Routes>
  );
};
