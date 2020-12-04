import React, { useEffect } from "react";
import PropTypes from "prop-types";
//import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getJob, applyJob } from "../../actions/job";
import Moment from "react-moment";
import auth from "../../reducers/auth";
//import JobDescription from './JobDescription';
//import JobInfo from './JobInfo';

const Job = ({ getJob, applyJob, job: { job, loading }, auth, match }) => {
  useEffect(() => {
    getJob(match.params.id);
  }, [getJob, match.params.id]);

  return loading || job === null ? (
    <Spinner />
  ) : (
    <div className="page-content bg-white">
      <div
        className="dez-bnr-inr overlay-black-middle"
        style={{ background: "url(/images/banner/bnr1.jpg)" }}
      >
        <div className="container">
          <div className="dez-bnr-inr-entry">
            <h1 className="text-white">Job Detail</h1>

            <div className="breadcrumb-row">
              <ul className="list-inline">
                <li>
                  <a href="/dashboard">Dashboard</a>
                </li>
                <li>Job Detail</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="content-block">
        <div className="section-full content-inner-1">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="sticky-top">
                  <div className="row">
                    <div className="col-lg-12 col-md-6">
                      <div className="m-b30">
                        <img src="/images/blog/grid/pic1.jpg" alt="" />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-6">
                      <div className="widget bg-white p-lr20 p-t20  widget_getintuch radius-sm">
                        <h4 className="text-black font-weight-700 p-t10 m-b15">
                          Job Details
                        </h4>
                        <ul>
                          <li>
                            <i className="ti-money"></i>
                            <strong className="font-weight-700 text-black">
                              Company
                            </strong>{" "}
                            {job.companyname && job.companyname}
                          </li>
                          <li>
                            <i className="ti-shield"></i>
                            <strong className="font-weight-700 text-black">
                              Job Status
                            </strong>
                            {job.jobtitle && job.jobtitle}
                          </li>
                          <li>
                            <i className="ti-location-pin"></i>
                            <strong className="font-weight-700 text-black">
                              Address
                            </strong>
                            <span className="text-black-light">
                              {" "}
                              {job.location && job.location}{" "}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="job-info-box">
                  <h3 className="m-t0 m-b10 font-weight-700 title-head">
                    <p className="text-secondry m-r30">{job.title && job.title}</p>
                  </h3>
                  <ul className="job-info">
                    <li>
                      <strong>Job Type</strong> {job.type && job.type}
                    </li>
                    <li>
                      <strong>Deadline:</strong>
                      <Moment format="YYYY/MM/DD">{job.startdate && job.startdate}</Moment>
                    </li>
                    <li>
                      <i className="ti-location-pin text-black m-r5"></i>{" "}
                      {job.location && job.location}{" "}
                    </li>
                  </ul>
                  <h5 className="font-weight-600">Job Description</h5>
                  <div className="dez-divider divider-2px bg-gray-dark mb-4 mt-0"></div>
                  <p>{job.description && job.description}</p>
                  <h5 className="font-weight-600">How to Apply</h5>
                  <div className="dez-divider divider-2px bg-gray-dark mb-4 mt-0"></div>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages.
                  </p>
                  <h5 className="font-weight-600">Job Requirements</h5>
                  <div className="dez-divider divider-2px bg-gray-dark mb-4 mt-0"></div>
                  <ul className="list-num-count no-round">
                    <li>
                      The DexignLab Privacy Policy was updated on 25 June 2018.
                    </li>
                    <li>Who We Are and What This Policy Covers</li>
                    <li>
                      Remaining essentially unchanged It was popularised in the
                      1960s{" "}
                    </li>
                    <li>
                      Lorem Ipsum has been the industry's standard dummy text
                      ever since the 1500s,
                    </li>
                    <li>DexignLab standard dummy text ever since</li>
                  </ul>
                  {auth.user.type === "jobSeeker" &&
                  auth.isAuthenticated === true ? (
                    <button
                      className="site-button"
                      onClick={() => applyJob(job._id)}
                    >
                      Apply This Job
                    </button>
                  ) : (
                    <button className="site-button">View Candidates</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Job.propTypes = {
  getJob: PropTypes.func.isRequired,
  applyJob: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  job: state.job,
  auth: state.auth,
});

export default connect(mapStateToProps, { getJob, applyJob })(Job);
