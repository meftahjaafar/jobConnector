import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";
import Alert from "../layout/Alert";

const initialState = {
  school: "",
  degree: "",
  fieldofstudy: "",
  from: "",
  to: "",
  current: false,
  description: "",
};

const AddEducation= ({ addEducation, history }) => {
  const [formData, setFormData] = useState(initialState);
  const { school, degree, fieldofstudy, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
      e.preventDefault()
      addEducation(formData, history)
  }
  return (
    <Fragment>
      <div className="page-content bg-white">
        <div
          className="dez-bnr-inr overlay-black-dark"
          style={{ background: "url(images/banner/banner3.JPG)" }}
        >
          <div className="container">
            <div className="dez-bnr-inr-entry">
              <h1 className="text-white">Add Education</h1>
              <div className="breadcrumb-row">
                <ul className="list-inline">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>Add Education</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="content-block">
          <div className="section-full bg-white submit-resume content-inner-2">
            <div className="container">
              <h1 className="large text-primary">Add Your Education</h1>
              <p className="text-black font-20">
              <i class="fa fa-graduation-cap"></i> Add any school, bootcamp, etc that you have attended
              </p>
              <small>* = required field</small>
              <form autoComplete="off" onSubmit={onSubmit}>
                <div className="form-group">
                  <label>School*</label>
                  <input
                    type="text"
                    name="school"
                    className="form-control"
                    placeholder="School, Institute, Bootcamp...*"
                    value={school}
                    onChange={(e) => onChange(e)}
                  />
                  <small className="form-text">
                    Give us an idea of your diplomas
                  </small>
                </div>
                <div className="form-group">
                  <label>Degree*</label>
                  <input
                    type="text"
                    name="degree"
                    className="form-control"
                    placeholder="Bachelor, Master, PhD..."
                    value={degree}
                    onChange={(e) => onChange(e)}
                  />
                  <small className="form-text">
                    Could be your degree or your certificate
                  </small>
                </div>
                <div className="form-group">
                  <label>Field Of Study</label>
                  <input
                    type="text"
                    name="fieldofstudy"
                    className="form-control"
                    placeholder="IT, Math, Architecture..."
                    value={fieldofstudy}
                    onChange={(e) => onChange(e)}
                  />
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
                  If it's Your current School or Institute, Check me ?</label>
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
                  <label>Program Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    placeholder="A short descriptio, about your educational program"
                    value={description}
                    onChange={(e) => onChange(e)}
                  ></textarea>
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
