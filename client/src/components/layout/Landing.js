import React, { useContext, Fragment } from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import authContext from "../../context/auth/authContext";

export const Landing = () => {
  const AuthContext = useContext(authContext);
  const { isAuthenticated } = AuthContext;
  return (
    <div className="intro">
      <div className="desc">
        <h2>Welcome to Student Management System</h2>
        <h5>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi,
          quos?
        </h5>
      </div>
      <div>
        {!isAuthenticated ? (
          <Fragment>
            <Link to="/login" className="buttons">
              Login
            </Link>
            <Link to="/signup" className="buttons">
              Signup
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <Link to="/dashboard" className="buttons">
              Go to Dashboard
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Landing;
