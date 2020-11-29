import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="input-group">
      <div class="extra-nav">
        <Link to="/edit-profile" className="site-button outline">
          <i class="fa fa-user-circle"></i> Edit Profile
        </Link>
        <Link to="/add-experience" className="site-button outline">
          <i class="fa fa-black-tie "></i> Add Experience
        </Link>
        <Link to="/add-education" className="site-button outline">
          <i class="fa fa-graduation-cap"></i> Add Education
        </Link>
      </div>
    </div>
  );
};

export default DashboardActions;
