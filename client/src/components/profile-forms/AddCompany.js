import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { addCompany } from "../../actions/company";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "../layout/Alert";

const initialState = {
  name: "",
  location: "",
  description: "",
  website: "",
  created_date: "",
};

const AddCompany = ({ addCompany, history }) => {
  const [formData, setFormData] = useState(initialState);

  const { name, location, description, website, created_date } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addCompany(formData, history);
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
              <h1 className="text-white">Create Company Profile</h1>
              <div className="breadcrumb-row">
                <ul className="list-inline">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>Create Company Pofile</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="content-block">
          <div className="section-full bg-white submit-resume content-inner-2">
            <div className="container">
              <h1 className="large text-primary">
                Create Your Company Profile
              </h1>
              <p className="text-black font-20">
                <i className="fa fa-user" /> Let's get some information to make
                your company profile stand out
              </p>
              <small>* = required field</small>
              <form autoComplete="off" onSubmit={onSubmit}>
                <div className="form-group">
                  <label>Comany Name*</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Company Name...*"
                    value={name}
                    onChange={(e) => onChange(e)}
                  />
                  <small class="form-text">
                    Give us the name of your company
                  </small>
                </div>
                <div className="form-group">
                  <label>Your Website</label>
                  <input
                    type="text"
                    name="website"
                    className="form-control"
                    placeholder="Website"
                    value={website}
                    onChange={(e) => onChange(e)}
                  />
                  <small class="form-text">Could be the company website</small>
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
                  <label>Company Start Date</label>
                  <input
                    type="date"
                    name="created_date"
                    className="form-control"
                    placeholder="00-00-0000"
                    value={created_date}
                    onChange={(e) => onChange(e)}
                  />
                  <small class="form-text">
                  A company's start date is the date on which it legally came into existence.
                  </small>
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
                    Tell us a little about your company
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

AddCompany.propTypes = {
  addCompany: PropTypes.func.isRequired,
};

export default connect(null, { addCompany })(withRouter(AddCompany));
