import { Outlet, Route, Routes } from "react-router-dom";
import { UserHello } from "../auth/Userhello";
import { ChatEdit } from "../Chat/ChatEdit";
import { ChatForm } from "../Chat/ChatForm";
import { ChatList } from "../Chat/ViewChat";
import { ListOfDoctors } from "../doctors/DoctorInYourArea";
import { SymptomContainer } from "../Symptom/SymptomContainer";
import { TipList } from "../tips/TipList";
import "./views.css";
import logo from "./hypoLogo2.png";
import darkLogo from "./hypoLogoDark.png";

export const CustomerViews = ({ isDarkMode }) => {
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
          <Route path="/chatform" element={<ChatForm />} />
          <Route path="/viewAllTips" element={<TipList />} />
          <Route path="/SearchTips" element={<SymptomContainer />} />
          <Route path="/" element={<UserHello />} />
          <Route path="/chat/edit/:chatId" element={<ChatEdit />} />
          <Route path="/doctorList" element={<ListOfDoctors />} />
        </Routes>

        <Outlet />
      </div>
    </div>
  );
};
