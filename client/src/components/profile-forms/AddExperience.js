import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";
import Alert from "../layout/Alert";

const initialState = {
  company: "",
  title: "",
  location: "",
  from: "",
  to: "",
  current: false,
  description: "",
};

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState(initialState);
  const { company, title, location, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
      e.preventDefault()
      addExperience(formData, history)
  }
  return (
    <Fragment>
      <div className="page-content bg-white">
        <div
          className="dez-bnr-inr overlay-black-dark"
          style={{ background: "url(images/banner/banner2.JPG)" }}
        >
          <div className="container">
            <div className="dez-bnr-inr-entry">
              <h1 className="text-white">Add Experience</h1>
              <div className="breadcrumb-row">
                <ul className="list-inline">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>Add Experience</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="content-block">
          <div className="section-full bg-white submit-resume content-inner-2">
            <div className="container">
              <h1 className="large text-primary">Add an Experience</h1>
              <p className="text-black font-20">
              <i class="fa fa-address-card"></i> Add any positions that you
                have had in the past
              </p>
              <small>* = required field</small>
              <form autoComplete="off" onSubmit={onSubmit}>
                <div className="form-group">
                  <label>Job Title*</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Job Title*"
                    value={title}
                    onChange={(e) => onChange(e)}
                  />
                  <small className="form-text">
                    Give us an idea of where you are at in your career
                  </small>
                </div>
                <div className="form-group">
                  <label>Company*</label>
                  <input
                    type="text"
                    name="company"
                    className="form-control"
                    placeholder="Your Company"
                    value={company}
                    onChange={(e) => onChange(e)}
                  />
                  <small className="form-text">
                    Could be your own company or one you work for
                  </small>
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    placeholder="Tunis, TN"
                    value={location}
                    onChange={(e) => onChange(e)}
                  />
                  <small className="form-text">
                    City & Region suggested (eg. Paris, FR)
                  </small>
                </div>
                <div className="form-group">
                  <label>From</label>
                  <input
                    type="date"
                    name="from"
                    className="form-control"
                    placeholder="00-00-0000"
                    value={from}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-inline checkbox">
                <label className="form-text">
                  <input
                    type="checkbox"
                    name="current"
                    className="form-control"
                    checked={current}
                    value={current}
                    onChange={() => {
                      setFormData({ ...formData, current: !current });
                    }}
                  />
                  If it's Your current Job, Check me ?</label>
                </div>
                <div className="form-group">
                  <label>{current ? 'Disabled' : 'To'}</label>
                    <input
                      type="date"
                      name="to"
                      className="form-control"
                      value={to}
                      onChange={(e) => onChange(e)}
                      disabled={current}
                    />
                </div>
                <div className="form-group">
                  <label>Job Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    placeholder="A short resume about your experience"
                    value={description}
                    onChange={(e) => onChange(e)}
                  ></textarea>
                  <small className="form-text">
                    Tell us a little about your job description
                  </small>
                </div>
                <Alert />
                <div className="extra-nav">
                  <div className="extra-cell">
                    <button type="submit" className="site-button">
                      <i class="fa fa-paper-plane"></i> Submit
                    </button>
                    <Link to="/dashboard">
                      <button type="button" className="site-button">
                        <i class="fa fa-arrow-circle-left"></i> Go Back
                      </button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
