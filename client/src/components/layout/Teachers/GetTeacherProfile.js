import React, { Fragment } from "react";
import { useContext } from "react";
import teacherContext from "../../../context/teacher/teacherContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import authContext from "../../../context/auth/authContext";

const GetTeacherProfile = () => {
  const TeacherContext = useContext(teacherContext);
  const { currentProfile, getCurrentProfile, loading } = TeacherContext;
  const AuthContext = useContext(authContext);
  const { user } = AuthContext;
  useEffect(() => {
    console.log("LODAAAAA");
    getCurrentProfile();
  }, [user]);
  return currentProfile != null ? (
    <div>
      <h2> {currentProfile.phone}</h2>
      <h2>{currentProfile.designation}</h2>
      <Link to="/editProfile">Profile Settings</Link>
    </div>
  ) : (
    <Fragment>
      <Link to="/createProfile">Profile Settings</Link>
    </Fragment>
  );
};

export default GetTeacherProfile;
