import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT,
  LOAD_USER,
  LOAD_TEACHERS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("auth", true);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      localStorage.setItem("token", null);
      localStorage.setItem("auth", null);
      return {
        ...state,
        token: null,
        isAuthenticated: null,
      };
    case LOAD_USER:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("auth");
      localStorage.removeItem("user");
      return {
        ...state,
        token: null,
        isAuthenticated: null,
      };
    case LOAD_TEACHERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
