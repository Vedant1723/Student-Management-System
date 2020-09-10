import React, { useEffect, useContext, Fragment } from "react";
import { useHistory, Link } from "react-router-dom";
import authContext from "../../../context/auth/authContext";
import Spinner from "../Spinner";
import "./Dashboard.css";
import Edit from "../Assets/edit.png";
import UserImg from "../Assets/user.png";
import teacherContext from "../../../context/teacher/teacherContext";

export const Dashboard = () => {
  const history = useHistory();
  const AuthContext = useContext(authContext);
  const { isAuthenticated, loadUser, user, loading } = AuthContext;
  const TeacherContext = useContext(teacherContext);
  const { currentProfile, getCurrentProfile } = TeacherContext;

  useEffect(() => {
    if (isAuthenticated) {
      loadUser();
      getCurrentProfile();
      history.push("/dashboard");
      console.log("User signed in::", user.name);
    } else {
      history.push("/");
    }
  }, [isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div
          style={{
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
            margin: 20,
          }}
        >
          <div className="col s12 m3 l3">
            <div className="card auth-card center-align">
              <div className="card-content black-text center-align  ">
                <img src={user.avatar} />
                <p className="center-align">
                  <b>{user.name}</b>
                </p>
                <p className="center-align">
                  <b>{user.email}</b>
                </p>
                <p className="center-align">
                  <b>{currentProfile.designation}</b>
                </p>
                <p className="center-align">
                  <b>{user.department}</b>
                </p>
              </div>
            </div>
          </div>
          <div>
            <div
              style={{
                justifyContent: "space-around",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div className="col s12 m3 l3" style={{ margin: 10 }}>
                <div
                  className="card auth-card center-align button"
                  onClick={() => history.push("/createStudent")}
                >
                  <div className="card-content black-text">
                    <img src={Edit} height="30" width="30" />
                    <p className="center-align">
                      <b>Add Students</b>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col s12 m3 l3" style={{ margin: 10 }}>
                <div
                  className="card auth-card center-align button"
                  onClick={() => history.push("/getStudents")}
                >
                  <div className="card-content black-text">
                    <img src={UserImg} height="30" width="30" />
                    <p className="center-align">
                      <b>Show Students</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Dashboard;
