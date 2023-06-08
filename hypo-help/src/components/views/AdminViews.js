import { Outlet, Route, Routes } from "react-router-dom";
import { ChatList } from "../Chat/ViewChat";

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
      </Route>
    </Routes>
  );
};
