import React, { useReducer } from "react";
import authReducer from "./authReducer";
import AuthContext from "./authContext";
import axios from "axios";

import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT,
  LOAD_USER,
  LOAD_TEACHERS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    user: {},
    users: [],
    isAuthenticated: JSON.parse(localStorage.getItem("auth")),
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //   Login User
  const login = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/auth", formData, config);
      console.log(res.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.message });
      alert(error.message);
    }
  };

  const register = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/users", formData, config);
      console.log(res.data);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.message });
      alert(error.message);
    }
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  const loadUser = async () => {
    try {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const res = await axios.get("/api/auth", config);
      console.log("User Loaded Successfully", res.data);
      dispatch({ type: LOAD_USER, payload: res.data });
    } catch (err) {
      console.log(err.message);
    }
  };

  const loadTeachers = async () => {
    try {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const res = await axios.get("api/users/", config);
      console.log(res.data);
      dispatch({ type: LOAD_TEACHERS, payload: res.data });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        user: state.user,
        users: state.users,
        loading: state.loading,
        login,
        register,
        logout,
        loadUser,
        loadTeachers,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
