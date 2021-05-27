import React, { useState } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import "./Login.css";

function Login() {
  const [log, setLog] = useState(true);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const [error, setError] = useState(null);

  const login = (e) => {
    e.preventDefault();
    if (log) {
      auth
        .signInWithEmailAndPassword(email, pw)
        .then((user) => {
          dispatch({
            type: "SET_USER",
            user: user,
          });
        })
        .catch((err) => setError(err.message));
    } else {
      auth.createUserWithEmailAndPassword(email, pw).then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });
    }
  };

  return (
    <div className="login">
      <div className="l-cont">
        <h1>{log ? "LOGIN" : "SIGNUP"}</h1>
        <form>
          <div className="l-opt">
            <p>Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="l-opt">
            <p>Password</p>
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </div>

          <div className="btns">
            <button type="submit" onClick={(e) => login(e)}>
              {log ? "LOGIN" : "SIGNUP"}
            </button>
            <p
              onClick={() => {
                log ? setLog(false) : setLog(true);
              }}
            >
              {log ? "SIGNUP" : "LOGIN"}
            </p>
          </div>
        </form>

        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
