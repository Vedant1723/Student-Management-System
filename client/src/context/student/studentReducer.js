import {
  LOAD_STUDENT,
  CREATE_STUDENT,
  UPDATE_STUDENT,
  LOAD_FAIL,
  DELETE_STUDENT,
  SEND_OBJ,
} from "../types";
export default (state, action) => {
  switch (action.type) {
    case LOAD_STUDENT:
      return {
        ...state,
        students: action.payload,
        loading: false,
      };
    case CREATE_STUDENT:
      return {
        ...state,
        student: action.payload,
        loading: false,
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter((s) => s._id !== action.payload),
      };
    case UPDATE_STUDENT:
      return {
        ...state,
        loading: false,
        student: action.payload,
      };
    case SEND_OBJ: {
      return {
        ...state,
        student: action.payload,
      };
    }
    default:
      return state;
  }
};
