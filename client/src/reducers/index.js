import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import company from './company';
import job from './job';


export default combineReducers({
    alert,
    auth, 
    profile,
    post,
    company,
    job
});