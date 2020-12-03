import React from "react";
import { Link } from "react-router-dom";

const DashboardHr = () => {
  return (
    <div className="input-group">
      <div className="extra-nav">
        <Link to="/edit-profile" className="site-button outline">
          <i className="fa fa-user-circle"></i> Edit Profile
        </Link>
        <Link to="/add-experience" className="site-button outline">
          <i className="fa fa-black-tie "></i> Add Experience
        </Link>
        <Link to="/add-education" className="site-button outline">
          <i className="fa fa-graduation-cap"></i> Add Education
        </Link>
        <Link to="/add-company" className="site-button outline">
          <i className="fa fa-building"></i> Add Company
        </Link>
        <Link to="/add-job" className="site-button outline">
          <i className="fa fa-briefcase"></i> Add Job
        </Link>
      </div>
    </div>
  );
};

export default DashboardHr;
