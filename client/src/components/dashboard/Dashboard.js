import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";

import Education from "./Education";
import Experience from "./Experience";
import DashboardActions from "./DashboardActions";
import Spinner from "../layout/Spinner";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (loading && profile === null ? (
    <Spinner />
  ) : (

    <Fragment>
      <h1 className="text-black font-24">
        {" "}
        <i className="fa fa-user" /> Welcome {user && user.name}
      </h1>

      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className="pagination-bx m-t30">
          <button
            className="site-button red outline"
            onClick={() => deleteAccount()}
          >
            <i className="fa fa-user-times"></i> Delete Account
          </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p className="text-black font-16">
            You have not yet setup a profile, please add some info
          </p>
          <Link to="/create-profile" className="site-button">
            <i className="fa fa-address-book"></i> Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  ));
  
  };

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
