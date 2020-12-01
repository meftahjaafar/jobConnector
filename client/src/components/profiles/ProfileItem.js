import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import avatar from "./avatar.png";
import Moment from "react-moment";

const ProfileItem = ({ profile }) => {
  return (
    <li>
      <Link to={`/profile/user/${profile && profile.user ? profile.user._id : "notfound"}`}>
        <div className="d-flex m-b30">
          <div className="job-post-company">
            <span>
              <img
                src={profile && profile.user ? profile.user.avatar : { avatar }}
              />
            </span>
          </div>
          <div className="job-post-info">
            <h4>{profile && profile.user ? profile.user.name : " "}</h4>
            <ul>
              <li>
                <i className="fa fa-map-marker"></i>{" "}
                {profile.location && <span>{profile.location}</span>}
              </li>
              <li>
                <i className="fa fa-usd"></i> {profile.status}{" "}
                {profile.company && <span> at {profile.company}</span>}
              </li>
              <li>
                <i className="fa fa-clock-o"></i> Member Since{" "}
                <Moment format="YYYY/MM">{profile.date}</Moment>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex">
          <div className="job-time mr-auto">
            {profile.skills.slice(0, 4).map((skill, index) => (
              <span key={index}>{skill}</span>
            ))}
          </div>

        </div>
        <span className="post-like fa fa-heart-o"></span>
      </Link>
    </li>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
