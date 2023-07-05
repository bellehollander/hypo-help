import { Route, Routes } from "react-router-dom";
import { Authorized } from "./views/Authorized";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./Repairs.css";
import { AppContainer } from "./views/AppContainer";

export const Repairs = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="*"
        element={
          <Authorized>
            <>
              <AppContainer />
            </>
          </Authorized>
        }
      />
    </Routes>
  );
};
