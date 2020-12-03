import axios from 'axios';
import { setAlert } from './alert';
import {
    ADD_COMPANY,
    COMPANY_ERROR,
    GET_COMPANY,
    GET_COMPANIES,
    UPDATE_COMPANY
} from './types';

// Get companies
export const getCompanies = () => async dispatch => {
    try {
      const res = await axios.get('/api/company');
  
      dispatch({
        type: GET_COMPANIES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: COMPANY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

// Get company
export const getCompany = id => async dispatch => {
    try {
      const res = await axios.get(`/api/company/${id}`);
  
      dispatch({
        type: GET_COMPANY,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: COMPANY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

// Add  || edit company
export const addCompany = (formData, history, edit = false) => async dispatch => {
    try {
      const res = await axios.post('/api/company', formData);
  
      dispatch({
        type: ADD_COMPANY,
        payload: res.data
      });
      dispatch(
        setAlert(
          edit ? "Company Profile Updated with success" : "Company Profile Created with success",
          "success"
        )
      );
  
      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      dispatch({
        type: COMPANY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

