import {
  ADD_JOB,
  JOB_ERROR,
  GET_JOB,
  GET_JOBS,
  UPDATE_JOB,
  APPLY_JOB,
  DELETE_JOB,
  CLEAR_JOB
} from "../actions/types";

const initialState = {
  job: null,
  jobs: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_JOB:
    case UPDATE_JOB:
    case ADD_JOB:
    case APPLY_JOB:
      return {
        ...state,
        job: payload,
        loading: false,
        error: {},
      };
    case JOB_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        job: null,
        jobs: [],
      };
    case GET_JOBS:
      return {
        ...state,
        jobs: payload,
        loading: false,
      };
    case DELETE_JOB:
    case CLEAR_JOB:
      return {
        ...state,
        job: null,
        jobs: [],
        loading: false,
      };

    default:
      return state;
  }
}
