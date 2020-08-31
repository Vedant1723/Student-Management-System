import { GET_CURRENT_PROFILE, UPDATE_PROFILE, CLEAR_PROFILE } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_CURRENT_PROFILE:
      return {
        ...state,
        currentProfile: action.payload,
        loading: false,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        currentProfile: action.payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        currentProfile: {},
      };
    default:
      return {
        ...state,
      };
  }
};
