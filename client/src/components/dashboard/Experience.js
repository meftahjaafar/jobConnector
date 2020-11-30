import React, { Fragment } from "react";
import { Link } from "react-router-dom"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";

const Experience = ({ experience }) => {
  const experiences = experience.map((exp) => (
    <li>
      <Link to={`experience/${exp._id}`}>
        <div className="d-flex m-b30">
          <div className="job-post-company">
            <span>
              <img src="images/logo/icon1.png" alt="logo" />
            </span>
          </div>
          <div className="job-post-info">
            <h4>{exp.title}</h4>
            <ul>
            <li>
                <i className="fa fa-briefcase"></i> {exp.company}
              </li>
              <li>
                <i className="fa fa-map-marker"></i> {exp.location}
              </li>
              {exp.current  ? (
                <li>
                  <i className="fa fa-bookmark-o"></i> Full Time
                </li>
              ) : (
              <li>{}</li>
              )}
              <li>
                <i className="fa fa-clock-o"></i>
                <Moment format="YYYY/MM">{exp.from}</Moment>
              </li>
              {exp.current ? (
                <li>
                  <i className="fa fa-clock-o"></i> Now
                </li>
              ) : (
                <li>
                  <i className="fa fa-clock-o"></i> 
                  <Moment format="YYYY/MM">{exp.to}</Moment>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="d-flex">
          <div className="form-text">
              <span className="text-black font-18">{exp.description}</span>
          </div>

        </div>
        <span className="post-like fa fa-heart-o"></span>
      </Link>
    </li>
  ));
  return (
<div>
      <h3 className="widget-title  text-uppercase">Experiences Credentials</h3>
      <ul className="post-job-bx">{experiences}</ul>
      </div>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default Experience;
