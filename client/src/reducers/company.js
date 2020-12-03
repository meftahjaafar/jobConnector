import {
    GET_COMPANY,
    GET_COMPANIES,
    ADD_COMPANY,
    UPDATE_COMPANY,
    COMPANY_ERROR
  } from "../actions/types";
  
  const initialState = {
    company: null,
    companies: [],
    loading: true,
    error: {},
  };

  export default function (state = initialState, action){
    const { type, payload } = action;
    
    switch (type) {
        case GET_COMPANY:
        case UPDATE_COMPANY:
        case ADD_COMPANY:
          return {
            ...state,
            company: payload,
            loading: false,
            error: {},
          };
        case COMPANY_ERROR:
          return {
            ...state,
            error: payload,
            loading: false,
            company: null,
            companies:[]
          };
        case GET_COMPANIES:
          return {
            ...state,
            companies: payload,
            loading: false,
          };

        default:
          return state;
      }
  }