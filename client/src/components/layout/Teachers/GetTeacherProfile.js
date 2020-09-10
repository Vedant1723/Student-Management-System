import React, { Fragment } from "react";
import { useContext } from "react";
import teacherContext from "../../../context/teacher/teacherContext";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import authContext from "../../../context/auth/authContext";
import Spinner from "../Spinner";

const GetTeacherProfile = () => {
  const history = useHistory();
  const TeacherContext = useContext(teacherContext);
  const { currentProfile, getCurrentProfile, loading } = TeacherContext;
  const AuthContext = useContext(authContext);
  const { user, loadUser, isAuthenticated } = AuthContext;
  useEffect(() => {
    if (isAuthenticated) {
      getCurrentProfile();
      loadUser();
    } else {
      history.push("/");
    }
  }, [isAuthenticated]);
  return currentProfile != null ? (
    <div>
      <div className="row">
        <div className="col s3 m3"></div>
        <div className="col s12 m6 l6">
          <div className="card auth-card">
            <div className="card-content center-align black-text">
              <span className="card-title center-align"></span>
              <div style={{ margin: "20px" }}>
                <Link to="/editProfile" className="buttons">
                  Edit or Create Profile
                </Link>
              </div>
              <div>
                <img src={user.avatar} alt="profile" />
              </div>
              <div>
                <b>
                  <h4>{user.name}</h4>
                </b>
              </div>
              <div>
                <b>{user.email}</b>
              </div>
              <div>
                <b>{user.department}</b>
              </div>
              <div>
                <b>{currentProfile.designation}</b>
              </div>
              <div>
                <b>{currentProfile.phone}</b>
              </div>
              <div>
                <b>{currentProfile.skills}</b>
              </div>
              <div>
                <b>{currentProfile.address}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col s3 m3"></div>
    </div>
  ) : (
    <Spinner />
  );
};

export default GetTeacherProfile;
