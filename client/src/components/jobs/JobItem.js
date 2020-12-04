import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import avatar from "./avatar.png";


const JobItem = ({ job }) => {
  return (
    <li>
      <Link to={`/jobs/job/${job && job.jobtitle ? job._id : "notfound"}`}>
        <div className="d-flex m-b30">
          <div className="job-post-company">
            <span>
              <img
                src={job && job.imagepost ? job.imagepost : { avatar }}
                alt="job post's image"
              />
            </span>
          </div>
          <div className="job-post-info">
            <h4>{job && job.jobtitle ? job.jobtitle : " " }</h4>
            <ul>
              <li>
                <i className="fa fa-map-marker"></i>{" "}
                <span>{job && job.location ? job.location : " " }</span>
              </li>
              <li>
                <i className="fa fa-usd"></i> 
                <span>{job && job.companyname ? job.companyname : " " }</span>
              </li>
              <li>
                <i className="fa fa-clock-o"></i> Published on{" "}
                <Moment format="YYYY/MM/DD">{job && job.createddate ? job.createddate : " " }</Moment>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex">
          <div className="job-time mr-auto">
          {job && job.skills ? job.skills.slice(0, 4).map((skill, index) => (
              <span key={index}>{skill}</span>
            )) : " " }
          </div>

        </div>
        <span className="post-like fa fa-heart-o"></span>
      </Link>
    </li>
  );
};

JobItem.propTypes = {
  job: PropTypes.object.isRequired,
};

export default JobItem;
