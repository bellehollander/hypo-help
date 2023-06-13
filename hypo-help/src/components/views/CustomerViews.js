import { Outlet, Route, Routes } from "react-router-dom";
import { UserHello } from "../auth/Userhello";
import { ChatForm } from "../Chat/ChatForm";
import { ChatList } from "../Chat/ViewChat";
import { SymptomContainer } from "../Symptom/SymptomContainer";
import { TipList } from "../tips/TipList";
import "./views.css";

export const CustomerViews = () => {
  return (
    <div className="app-container">
      <div className="background-image"></div>

      <div className="content-container">
        <div className="hypo-header">
          <h1 className="hypo-title">HYPO-HELP</h1>
          <div className="hypo-subtitle">
            Helping those with health anxiety, one less scary google search at a
            time.
          </div>
        </div>

        <Routes>
          <Route path="/viewchat" element={<ChatList />} />
          <Route path="/chatform" element={<ChatForm />} />
          <Route path="/viewAllTips" element={<TipList />} />
          <Route path="/SearchTips" element={<SymptomContainer />} />
          <Route path="/" element={<UserHello />} />
        </Routes>

        <Outlet />
      </div>
    </div>
  );
};
