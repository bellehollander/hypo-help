import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "./hypoLogo2.png";

export const Login = () => {
  const [email, set] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    return fetch(`http://localhost:8088/users?email=${email}`)
      .then((res) => res.json())
      .then((foundUsers) => {
        if (foundUsers.length === 1) {
          const user = foundUsers[0];
          localStorage.setItem(
            "hypo_user",
            JSON.stringify({
              name: user.name,
              id: user.id,
              staff: user.isStaff,
            })
          );

          navigate("/");
        } else {
          window.alert("Invalid login");
        }
      });
  };

  return (
    <main className="container--login">
      <section>
        <form className="form--login" onSubmit={handleLogin}>
          <div className="hypo-image-login">
            <img src={logo} alt="cloud-logo" />
          </div>
          <h2 className="sign-in">Please sign in</h2>
          <fieldset>
            <label htmlFor="inputEmail">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(evt) => set(evt.target.value)}
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <button type="submit" className="sign-in">
              Sign in
            </button>
            <div className="link--register">
              <Link to="/register">Not a member yet?</Link>
            </div>
          </fieldset>
        </form>
      </section>
    </main>
  );
};
