import React, { useReducer } from "react";
import axios from "axios";

import {
  LOAD_STUDENT,
  CREATE_STUDENT,
  UPDATE_STUDENT,
  LOAD_FAIL,
  DELETE_STUDENT,
  SEND_OBJ,
  FILTER_STUDENTS,
} from "../types";
import studentReducer from "./studentReducer";
import StudentContext from "./studentContext";

const StudentState = (props) => {
  const initialState = {
    student: {},
    filterStudents: [],
    students: [],
    loading: true,
    error: null,
  };
  const [state, dispatch] = useReducer(studentReducer, initialState);

  const getStud = async () => {
    try {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const res = await axios.get("/api/students", config);
      console.log("Students are:", res.data);
      dispatch({ type: LOAD_STUDENT, payload: res.data });
    } catch (error) {
      dispatch({ type: LOAD_FAIL, payload: error });
    }
  };

  const filterStud = (value) => {
    console.log(value);

    dispatch({ type: FILTER_STUDENTS, payload: value });
  };

  const createStud = async (formData) => {
    try {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/students", formData, config);
      console.log("Student Created", res.data);
      dispatch({ type: CREATE_STUDENT, payload: res.data });
    } catch (error) {
      console.log("Error While Creating the Student Object", error.message);
    }
  };
  const removeStud = async (id) => {
    if (window.confirm("Are you Sure? This can`t be undone!")) {
      try {
        const config = {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        };
        const res = await axios.delete(`/api/students/${id}`, config);
        console.log("Student Removed");
        dispatch({ type: DELETE_STUDENT, payload: id });
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  const updateStud = async (id, formData) => {
    try {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const res = await axios.put(`/api/students/${id}`, formData, config);
      console.log("Student Updated!", res.data);
      dispatch({ type: UPDATE_STUDENT, payload: res.data });
    } catch (error) {
      console.log(error.message);
    }
  };
  const getObj = (formData) => {
    dispatch({ type: SEND_OBJ, payload: formData });
  };
  return (
    <StudentContext.Provider
      value={{
        student: state.student,
        students: state.students,
        loading: state.loading,
        error: state.error,
        filterStudents: state.filterStudents,
        createStud,
        getStud,
        removeStud,
        updateStud,
        getObj,
        filterStud,
      }}
    >
      {props.children}
    </StudentContext.Provider>
  );
};

export default StudentState;
