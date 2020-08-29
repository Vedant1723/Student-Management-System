import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import authContext from "../../context/auth/authContext";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dept, setDepartment] = useState(null);
  const options = [
    { label: "Computer Applications", value: "Computer Applications" },
    { label: "Engineering", value: "Engineering" },
    { label: "Business School", value: "Business School" },
    { label: "Allied Health Science", value: "Allied Health Science" },
  ];
  const history = useHistory();
  const AuthContext = useContext(authContext);
  const { register, isAuthenticated } = AuthContext;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }, [isAuthenticated]);

  const submitData = async () => {
    const department = dept.value;
    register({ name, email, password, department });
  };

  return (
    <div className="row">
      <div className="col s3 m3"></div>
      <div className="col s12 m6 l6">
        <div className="card auth-card">
          <div className="card-content black-text">
            <span className="card-title center-align">
              <b>Signup</b>
            </span>
            <div class="input-field ">
              <input
                id="name"
                type="text"
                class="validate"
                onChange={(e) => setName(e.target.value)}
              />
              <label for="name">Name</label>
            </div>
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
            <div class="input-field">
              <input
                id="confirm-password"
                type="password"
                class="validate"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label for="confirm-password">Confirm Password</label>
            </div>

            <Select
              options={options}
              value={dept}
              onChange={(e) => setDepartment(e)}
            />
            <div>
              <button className="buttons" onClick={submitData}>
                Signup
              </button>
            </div>
            <div>
              Already have an Account?
              <Link to="/login"> Log in</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col s3 m3"></div>
    </div>
  );
};

export default Signup;
