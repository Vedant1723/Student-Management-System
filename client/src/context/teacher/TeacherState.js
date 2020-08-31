import React, { useReducer } from "react";
import axios from "axios";
import { GET_CURRENT_PROFILE, UPDATE_PROFILE, CLEAR_PROFILE } from "../types";
import teacherReducer from "./teacherReducer";
import TeacherContext from "./teacherContext";

const TeacherState = (props) => {
  const initialState = {
    currentProfile: {},
    loading: true,
    error: null,
  };
  const [state, dispatch] = useReducer(teacherReducer, initialState);

  const getCurrentProfile = async () => {
    try {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const res = await axios.get("/api/profile/me", config);
      console.log("Current User Proifle", res.data);
      dispatch({ type: GET_CURRENT_PROFILE, payload: res.data });
    } catch (error) {
      console.log("Error Loading Profile", error.message);
    }
  };
  const updateProfile = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const res = await axios.post("/api/profile", formData, config);
      console.log("Profile Updated::", res.data);
      dispatch({ type: UPDATE_PROFILE, payload: res.data });
    } catch (error) {
      console.log(error.message);
    }
  };
  const clearPro = () => {
    dispatch({ type: CLEAR_PROFILE });
  };

  return (
    <TeacherContext.Provider
      value={{
        currentProfile: state.currentProfile,
        loading: state.loading,
        error: state.error,
        getCurrentProfile,
        updateProfile,
        clearPro,
      }}
    >
      {props.children}
    </TeacherContext.Provider>
  );
};
export default TeacherState;
