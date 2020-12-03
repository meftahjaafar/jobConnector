import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { addJob } from "../../actions/job";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "../layout/Alert";

const initialState = {
  skills: "",
  location: "",
  description: "",
  isactive: false,
  startdate: "",
  type: "",
  jobtitle:""
};

const AddJob = ({ addJob, history }) => {
  const [formData, setFormData] = useState(initialState);

  const { skills, location, description, isactive, startdate, type, jobtitle } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addJob(formData, history);
  };

  return (
    <Fragment>
      <div className="page-content bg-white">
        <div
          className="dez-bnr-inr overlay-black-dark"
          style={{ background: "url(images/banner/banner1.JPG)" }}
        >
          <div className="container">
            <div className="dez-bnr-inr-entry">
              <h1 className="text-white">Create Job Post</h1>
              <div className="breadcrumb-row">
                <ul className="list-inline">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>Create Job Post</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="content-block">
          <div className="section-full bg-white submit-resume content-inner-2">
            <div className="container">
              <h1 className="large text-primary">
                Create Job Post
              </h1>
              <p className="text-black font-20">
                <i className="fa fa-user" /> Let's get some information to make
                your job post stand out
              </p>
              <small>* = required field</small>
              <form autoComplete="off" onSubmit={onSubmit}>
                <div className="form-group">
                  <label>Job Title*</label>
                  <input
                    type="text"
                    name="jobtitle"
                    className="form-control"
                    placeholder="Job status...*"
                    value={jobtitle}
                    onChange={(e) => onChange(e)}
                  />
                  <small class="form-text">
                    Give us the name of your company
                  </small>
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    placeholder="Location, Region"
                    value={location}
                    onChange={(e) => onChange(e)}
                  />
                  <small class="form-text">
                    City & Region suggested (eg. Tunis, TN)
                  </small>
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <input
                    type="text"
                    name="type"
                    className="form-control"
                    placeholder="Full Time, Part Time, Freelance..."
                    value={type}
                    onChange={(e) => onChange(e)}
                  />
                  <small class="form-text">
                    City & Region suggested (eg. Tunis, TN)
                  </small>
                </div>
                <div className="form-group">
                  <label>Job Start Date</label>
                  <input
                    type="date"
                    name="startdate"
                    className="form-control"
                    placeholder="00-00-0000"
                    value={startdate}
                    onChange={(e) => onChange(e)}
                  />
                  <small class="form-text">
                  A company's start date is the date on which it legally came into existence.
                  </small>
                </div>
                <div className="form-inline checkbox">
                  <label className="form-text">
                    <input
                      type="checkbox"
                      name="isactive"
                      className="form-control"
                      checked={isactive}
                      value={isactive}
                      onChange={() => {
                        setFormData({ ...formData, isactive: !isactive });
                      }}
                    />
                   {" "}To active the job post and share it, Check me ?
                  </label>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    placeholder="A short description about your company"
                    value={description}
                    onChange={(e) => onChange(e)}
                  ></textarea>
                  <small class="form-text">
                    Tell us a description about your Job post
                  </small>
                </div>
                <div className="form-group">
                  <label>Skills*</label>
                  <input
                    type="text"
                    name="skills"
                    className="form-control"
                    placeholder="* Skills"
                    value={skills}
                    onChange={(e) => onChange(e)}
                  />
                  <small class="form-text">
                    Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)
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

AddJob.propTypes = {
  addJob: PropTypes.func.isRequired,
};

export default connect(null, { addJob })(withRouter(AddJob));
