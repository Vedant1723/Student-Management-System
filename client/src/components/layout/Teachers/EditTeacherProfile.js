import React, { useContext, Fragment } from "react";
import { useState } from "react";
import teacherContext from "../../../context/teacher/teacherContext";
import Spinner from "../Spinner";
import authContext from "../../../context/auth/authContext";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const EditTeacherProfile = () => {
  const history = useHistory();
  const TeacherContext = useContext(teacherContext);
  const { currentProfile, getCurrentProfile, updateProfile } = TeacherContext;
  const AuthContext = useContext(authContext);
  const { isAuthenticated } = AuthContext;
  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated]);
  //   useEffect(() => {
  //     if (currentProfile) {
  //       getCurrentProfile();
  //     }
  //   }, [getCurrentProfile]);
  const [mobile, setPhone] = useState(currentProfile.phone);
  const [desig, setDesignation] = useState(currentProfile.designation);
  const [skl, setSkills] = useState(currentProfile.skills);
  const [location, setAddress] = useState(currentProfile.address);
  const update = () => {
    const data = {
      phone: mobile,
      designation: desig,
      skills: skl,
      address: location,
    };
    updateProfile(data);
    alert("Profile Updated!");
    history.push("/dashboard");
    // console.log(data);
  };

  return (
    <Fragment>
      {currentProfile !== null ? (
        <div class="row">
          <h2>Edit your Profile</h2>
          <form class="col s12">
            <div class="row">
              <div class="input-field col s5">
                <input
                  id="roll"
                  type="number"
                  class="validate"
                  value={mobile}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
                <label for="roll">Phone Number</label>
              </div>

              <div class="input-field col s5">
                <input
                  id="desig"
                  type="text"
                  class="validate"
                  value={desig}
                  onChange={(e) => {
                    setDesignation(e.target.value);
                  }}
                />
                <label for="desig">Designation</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s5">
                <input
                  id="skl"
                  type="text"
                  class="validate"
                  value={skl}
                  onChange={(e) => {
                    setSkills(e.target.value);
                  }}
                />
                <label for="skl">Skills</label>
              </div>
              <div class="input-field col s5">
                <input
                  id="location"
                  type="text"
                  class="validate"
                  value={location}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
                <label for="location">Address</label>
              </div>
            </div>
          </form>
          <button
            className="buttons"
            onClick={() => {
              update();
            }}
          >
            Submit
          </button>
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};
