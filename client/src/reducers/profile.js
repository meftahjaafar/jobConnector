import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE
  } from '../actions/types';
  
  const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_PROFILE:
        return {
          ...state,
          profile: payload,
          loading: false,
          error: {}
        };
      case PROFILE_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
          profile: null
        };
        case CLEAR_PROFILE:
          return {
            ...state,
            repos: [],
            loading: false,
            profile: null
          };
      default:
        return state;
    }
  }