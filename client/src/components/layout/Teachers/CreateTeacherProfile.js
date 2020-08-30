import React, { useContext, Fragment } from "react";
import { useState } from "react";
import teacherContext from "../../../context/teacher/teacherContext";
import Spinner from "../Spinner";

export const CreateTeacherProfile = () => {
  const TeacherContext = useContext(teacherContext);
  const { currentProfile, getCurrentProfile } = TeacherContext;
  //   useEffect(() => {
  //     if (currentProfile) {
  //       getCurrentProfile();
  //     }
  //   }, [getCurrentProfile]);
  const [mobile, setPhone] = useState("");
  const [desig, setDesignation] = useState("");
  const [skl, setSkills] = useState("");
  const [location, setAddress] = useState("");
  const sample = () => {
    const data = {
      phoone: mobile,
      designation: desig,
      skills: skl,
      address: location,
    };
    console.log(data);
  };

  return (
    <Fragment>
      {currentProfile !== null ? (
        <div class="row">
          <h2>Create your Profile</h2>
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
              sample();
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
