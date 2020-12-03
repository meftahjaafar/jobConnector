import axios from "axios";
import { setAlert } from "./alert";
import {
  ADD_JOB,
  JOB_ERROR,
  GET_JOB,
  GET_JOBS,
  UPDATE_JOB,
  APPLY_JOB,
  DELETE_JOB,
  CLEAR_JOB,
} from "./types";

// Get jobs
export const getJobs = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/jobs");

    dispatch({
      type: GET_JOBS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get job by ID
export const getJob = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/jobs/job/${id}`);

    dispatch({
      type: GET_JOB,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get jobs by company
export const getCompanyJobs = (company_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/jobs/${company_id}/jobposts`);

    dispatch({
      type: GET_JOBS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add  Job
export const addJob = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/jobs", formData);

    dispatch({
      type: ADD_JOB,
      payload: res.data,
    });
    dispatch(setAlert("Job Post created with success", "success"));

    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Apply Job
export const applyJob = (job_id, formData, history) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/jobs/applyjob/${job_id}`, formData);

    dispatch({
      type: APPLY_JOB,
      payload: res.data,
    });
    dispatch(setAlert("You've applied for a job with success", "success"));

    history.push("/jobs");
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
