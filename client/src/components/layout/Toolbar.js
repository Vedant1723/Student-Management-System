import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import authContext from "../../context/auth/authContext";

export const Toolbar = () => {
  // const [token, setToken] = useState(null);

  const history = useHistory();
  const AuthContext = useContext(authContext);
  const { isAuthenticated, logout, loadTeachers, users } = AuthContext;

  const logUserOut = () => {
    logout();
  };

  const authLink = (
    <>
      <ul class="right hide-on-med-and-down black-text">
        <li>
          <a
            onClick={() => {
              history.push("/getTeachers");
            }}
            className="black-text"
          >
            Teachers
          </a>
        </li>
        <li>
          <a className="black-text" href="badges.html">
            Profile
          </a>
        </li>
        <li>
          <a onClick={() => logUserOut()} className="black-text">
            Logout
          </a>
        </li>
      </ul>
      <ul class="sidenav" id="mobile-demo">
        <li>
          <a href="sass.html">Sass</a>
        </li>
        <li>
          <a href="badges.html">Components</a>
        </li>
        <li>
          <a href="collapsible.html">Javascript</a>
        </li>
        <li>
          <a href="mobile.html">Mobile</a>
        </li>
      </ul>
    </>
  );

  return (
    <>
      <nav>
        <div class="nav-wrapper grey lighten-5 black-text z-depth-2">
          <Link to="/" class="brand-logo black-text bold">
            {" "}
            SMS
          </Link>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger">
            <i class="material-icons black-text">menu</i>
          </a>
          {isAuthenticated ? authLink : ""}
        </div>
      </nav>
    </>
  );
};
export default Toolbar;
