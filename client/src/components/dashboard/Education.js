import React, { Fragment } from "react";
import { Link } from "react-router-dom"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";

const Education = ({ education }) => {
  const educations = education.map((educ) => (
    <li>
      <Link to={`education/${educ._id}`}>
        <div className="d-flex m-b30">
          <div className="job-post-company">
            <span>
              <img src="images/logo/icon1.png" alt="logo" />
            </span>
          </div>
          <div className="job-post-info">
            <h4>{educ.degree}</h4>
            <ul>
            <li>
                <i className="fa fa-briefcase"></i> {educ.school}
              </li>
              <li>
                <i className="fa fa-map-marker"></i> {educ.fieldofstudy}
              </li>
              <li>
                <i className="fa fa-clock-o"></i>
                <Moment format="YYYY/MM/DD">{educ.from}</Moment>
              </li>
              {educ.current ? (
                <li>
                  <i className="fa fa-clock-o"></i> Now
                </li>
              ) : (
                <li>
                  <i className="fa fa-clock-o"></i> 
                  <Moment format="YYYY/MM">{educ.to}</Moment>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="d-flex">
          <div className="form-text">
              <span className="text-black">{educ.description}</span>
          </div>

        </div>
        <span className="post-like fa fa-heart-o"></span>
      </Link>
    </li>
  ));
  return (
    <div>
      <h3 className="widget-title  text-uppercase">Education Credentials</h3>
      <ul className="post-job-bx">{educations}</ul>
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
};

export default Education;
