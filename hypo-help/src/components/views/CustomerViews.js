import { Outlet, Route, Routes } from "react-router-dom";
import { ChatForm } from "../Chat/ChatForm";
import { ChatList } from "../Chat/ViewChat";
import { SymptomContainer } from "../Symptom/SymptomContainer";
import { TipList } from "../tips/TipList";

export const CustomerViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>HYPO-HELP</h1>
            <div>
              Helping those with health anxiety, one less scary google search at
              a time.
            </div>

            <Outlet />
          </>
        }
      >
        <Route path="/viewchat" element={<ChatList />} />
        <Route path="chatform" element={<ChatForm />} />
        <Route path="viewAllTips" element={<TipList />} />
        <Route path="SearchTips" element={<SymptomContainer />} />
      </Route>
    </Routes>
  );
};
