import React, { useState, useContext, useEffect } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import authContext from "../../context/auth/authContext";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const AuthContext = useContext(authContext);
  const { login, isAuthenticated } = AuthContext;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }, [isAuthenticated]);

  const submitData = () => {
    login({ email, password });
  };

  return (
    <div className="row">
      <div className="col s3 m3"></div>
      <div className="col s12 m6 l6">
        <div className="card auth-card">
          <div className="card-content black-text">
            <span className="card-title center-align">
              <b>Login</b>
            </span>
            <div class="input-field ">
              <input
                id="email"
                type="email"
                class="validate"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label for="email">Email</label>
            </div>
            <div class="input-field">
              <input
                id="password"
                type="password"
                class="validate"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label for="password">Password</label>
            </div>
            <button className="buttons" onClick={submitData}>
              Login
            </button>
            <div>
              Don't have an Account?
              <Link to="/signup"> Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col s3 m3"></div>
    </div>
  );
};

export default Login;
