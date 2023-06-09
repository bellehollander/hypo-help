import { Outlet, Route, Routes } from "react-router-dom";
import { ChatList } from "../Chat/ViewChat";
import { TipList } from "../tips/TipList";

export const AdminViews = () => {
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
        <Route path="/viewAllTips" element={<TipList />} />
      </Route>
    </Routes>
  );
};
