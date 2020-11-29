import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const initialState = {
  company: "",
  website: "",
  location: "",
  status: "",
  skills: "",
  githubusername: "",
  bio: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  youtube: "",
  instagram: "",
};

const EditProfile = ({
  createProfile,
  profile: { profile, loading },
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState(initialState);
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();
  
      setFormData({
        company: loading || !profile.company ? "" : profile.company,
        website: loading || !profile.website ? "" : profile.website,
        location: loading || !profile.location ? "" : profile.location,
        status: loading || !profile.status ? "" : profile.status,
        skills: loading || !profile.skills ? "" : profile.skills.join(","),
        githubusername:
          loading || !profile.githubusername ? "" : profile.githubusername,
        bio: loading || !profile.bio ? "" : profile.bio,
        twitter: loading || !profile.twitter ? "" : profile.twitter,
        facebook: loading || !profile.facebook ? "" : profile.facebook,
        linkedin: loading || !profile.linkedin ? "" : profile.linkedin,
        youtube: loading || !profile.youtube ? "" : profile.youtube,
        instagram: loading || !profile.instagram ? "" : profile.instagram,
      });
// eslint-disable-next-line 
  }, [loading]);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
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
              <h1 className="text-white">Create Profile</h1>
              <div className="breadcrumb-row">
                <ul className="list-inline">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>Create Pofile</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="content-block">
          <div className="section-full bg-white submit-resume content-inner-2">
            <div className="container">
              <h1 className="large text-primary">Create Your Profile</h1>
              <p className="text-black font-20">
                <i className="fa fa-user" /> Let's get some information to make
                your profile stand out
              </p>
              <small>* = required field</small>
              <form autoComplete="off" onSubmit={onSubmit}>
                <div className="form-group">
                  <label>Professional title*</label>
                  <input
                    type="text"
                    name="status"
                    className="form-control"
                    placeholder="Status*"
                    value={status}
                    onChange={(e) => onChange(e)}
                  />
                  <small class="form-text">
                    Give us an idea of where you are at in your career
                  </small>
                </div>
                <div className="form-group">
                  <label>Your Company</label>
                  <input
                    type="text"
                    name="company"
                    className="form-control"
                    placeholder="Your Company"
                    value={company}
                    onChange={(e) => onChange(e)}
                  />
                  <small class="form-text">
                    Could be your own company or one you work for
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
                  <small class="form-text">
                    Could be your own or a company website
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
                <div className="form-group">
                  <label>Github Username</label>
                  <div className="from-text">
                    <input
                      type="text"
                      className="form-control"
                      name="githubusername"
                      palceholder="Github Username"
                      value={githubusername}
                      onChange={(e) => onChange(e)}
                    />
                    <small class="form-text">
                      If you want your latest repos and a Github link, include
                      your username
                    </small>
                  </div>
                </div>
                <div className="form-group">
                  <label>Resume Content</label>
                  <textarea
                    className="form-control"
                    name="bio"
                    placeholder="A short bio about yourself"
                    value={bio}
                    onChange={(e) => onChange(e)}
                  ></textarea>
                  <small class="form-text">
                    Tell us a little about yourself
                  </small>
                </div>
                <div className="my-2">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => toggleSocialInputs(!displaySocialInputs)}
                  >
                    Add Social Network Links
                  </button>
                  <span>Optional</span>
                </div>
                {displaySocialInputs && (
                  <Fragment>
                    <div className="panel panel-default">
                      <div className="panel-body">
                        <div className="input-group">
                          <span className="input-group-addon" id="basic-addon1">
                            <i
                              className="fa fa-twitter fa-2x"
                              style={{ color: "#38a1f3" }}
                              aria-hidden="true"
                            ></i>
                          </span>
                          <input
                            type="text"
                            name="twitter"
                            value={twitter}
                            onChange={(e) => onChange(e)}
                            className="form-control"
                            placeholder="Twitter URL"
                            aria-describedby="basic-addon1"
                          />
                        </div>
                        <div className="input-group">
                          <span className="input-group-addon" id="basic-addon1">
                            <i
                              className="fa fa-youtube fa-2x"
                              style={{ color: "#c4302b" }}
                              aria-hidden="true"
                            ></i>
                          </span>
                          <input
                            type="text"
                            name="youtube"
                            value={youtube}
                            onChange={(e) => onChange(e)}
                            placeholder="YouTube URL"
                            className="form-control"
                            aria-describedby="basic-addon1"
                          />
                        </div>
                        <div className="input-group">
                          <span className="input-group-addon" id="basic-addon1">
                            <i
                              className="fa fa-linkedin fa-2x"
                              style={{ color: "#0077b5" }}
                              aria-hidden="true"
                            ></i>
                          </span>
                          <input
                            type="text"
                            name="linkedin"
                            value={linkedin}
                            onChange={(e) => onChange(e)}
                            placeholder="Linkedin URL"
                            className="form-control"
                            aria-describedby="basic-addon1"
                          />
                        </div>
                        <div className="input-group">
                          <span className="input-group-addon" id="basic-addon1">
                            <i
                              className="fa fa-instagram fa-2x"
                              aria-hidden="true"
                              style={{ color: "#3f729b" }}
                            ></i>
                          </span>
                          <input
                            placeholder="Instagram URL"
                            name="instagram"
                            value={instagram}
                            onChange={(e) => onChange(e)}
                            type="text"
                            className="form-control"
                            aria-describedby="basic-addon1"
                          />
                        </div>
                        <div className="input-group">
                          <span className="input-group-addon" id="basic-addon1">
                            <i
                              className="fa fa-facebook fa-2x"
                              style={{ color: "#3b5998" }}
                              aria-hidden="true"
                            ></i>
                          </span>
                          <input
                            type="text"
                            name="facebook"
                            value={facebook}
                            onChange={(e) => onChange(e)}
                            placeholder="Facebook URL"
                            className="form-control"
                            aria-describedby="basic-addon1"
                          />
                        </div>
                      </div>
                    </div>
                  </Fragment>
                )}

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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
