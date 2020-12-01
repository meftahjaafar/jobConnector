import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProfileAbout from './ProfileAbout';
import ProfileEducation from './ProfileEducation';
import ProfileExperience from './ProfileExperience';
import ProfileGithub from './ProfileGithub';
import ProfileTop from './ProfileTop';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const Profile = ({ getProfileById, profile: { profile }, auth, match }) => {
    useEffect(() => {
      getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);
    return (
        <div>
            
        </div>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };
const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
  });
  
  export default connect(mapStateToProps, { getProfileById })(Profile);
