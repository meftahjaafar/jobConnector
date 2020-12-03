import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profile";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
//   useEffect(() => {
//     getProfiles();
//   }, [getProfiles]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
   useEffect(() => {
    getProfiles();
    const results = profiles.filter((person) =>
      person.user.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [getProfiles, searchTerm]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className="page-wraper">
          <div className="page-content bg-white">
            <div className="content-block">
              <div className="section-full bg-white browse-job content-inner-2">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-9 col-lg-8">
                      <div className="m-b30">
                        <h1 className="large text-primary">Profiles</h1>
                        <p className="lead">
                          <i className="fa fa-connectdevelop" /> Browse and
                          connect with Job Board's users
                        </p>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search freelancer services"
                          value={searchTerm}
                          onChange={handleChange}
                        />
                      </div>
                      <ul className="post-job-bx">
                        {profiles.length > 0 ? (
                          searchResults.map((profile) => (
                            <ProfileItem key={profile._id} profile={profile} />
                          ))
                        ) : (
                          <h4>No profiles found...</h4>
                        )}
                      </ul>
                    </div>

                    <div className="col-xl-3 col-lg-4">
                      <div className="sticky-top">
                        <div className="clearfix m-b30">
                          <h5 className="widget-title font-weight-700 text-uppercase">
                            Keywords
                          </h5>
                          <div className="">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search"
                            />
                          </div>
                        </div>
                        <div className="clearfix m-b10">
                          <div className="clearfix m-b30">
                            <h5 className="widget-title font-weight-700 text-uppercase">
                              Job type
                            </h5>
                            <div className="row">
                              <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                <div className="product-brand">
                                  <div className="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="check1"
                                      name="example1"
                                    />
                                    <label
                                      className="custom-control-label"
                                      for="check1"
                                    >
                                      Part Time
                                    </label>
                                  </div>
                                  <div className="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="check2"
                                      name="example1"
                                    />
                                    <label
                                      className="custom-control-label"
                                      for="check2"
                                    >
                                      Full Time
                                    </label>
                                  </div>
                                  <div className="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="check3"
                                      name="example1"
                                    />
                                    <label
                                      className="custom-control-label"
                                      for="check3"
                                    >
                                      Internship
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                <div className="product-brand">
                                  <div className="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="check6"
                                      name="example1"
                                    />
                                    <label
                                      className="custom-control-label"
                                      for="check6"
                                    >
                                      Freelance
                                    </label>
                                  </div>
                                  <div className="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="check7"
                                      name="example1"
                                    />
                                    <label
                                      className="custom-control-label"
                                      for="check7"
                                    >
                                      Temporary
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className="scroltop fa fa-chevron-up"></button>
        </div>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
