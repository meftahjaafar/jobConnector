import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const JobInfo = ({job, auth, applyJob}) => {
    return (
<div></div>
    )
}

JobInfo.propTypes = {
auth: PropTypes.object.isRequired,
job: PropTypes.object.isRequired,
applyJob: PropTypes.func.isRequired,
}

export default JobInfo
