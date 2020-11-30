import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profile";


const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <Link to="/dashboard">
      <li>
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
              {exp.current ? (
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
        <div className="post-like fa fa-pencil"></div>
        <div
          className="post-trash fa fa-trash"
          onClick={() => deleteExperience(exp._id)}
        ></div>
      </li>
    </Link>
  ));
  return (
    <div>
      {experience.length > 0 ? (
        <Fragment>
          <h3 className="widget-title  text-uppercase">
            Experiences Credentials
          </h3>
          <ul className="post-job-bx">{experiences}</ul>
        </Fragment>
      ) : (
        <h5 className="widget-title">
         You dont have Experience Field Yet.
        </h5>
      )}
    </div>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
