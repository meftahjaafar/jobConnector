import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import avatar from "./avatar.png";
import company from "../../reducers/company";


const CompanyItem = ({ company }) => {
  return (
    <li>
      <Link to={`/company/${company && company.name ? company._id : "notfound"}`}>
        <div className="d-flex m-b30">
          <div className="job-post-company">
            <span>
              <img
                src={company && company.logo ? company.logo : { avatar }}
                alt="job post's image"
              />
            </span>
          </div>
          <div className="job-post-info">
            <h4>{company && company.name ? company.name : " " }</h4>
            <ul>
              <li>
                <i className="fa fa-map-marker"></i>{" "}
                <span>{company && company.location ? company.location : " " }</span>
              </li>
              <li>
                <i className="fa fa-usd"></i> 
                <span>{company && company.website ? company.website : " " }</span>
              </li>
              <li>
                <i className="fa fa-clock-o"></i> Started on{" "}
                <Moment format="YYYY/MM/DD">{company && company.created_date ? company.creatd_date : " " }</Moment>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex">
          <div className="job-time mr-auto">

              <span>{company && company.description ? company.description : ""}</span>

          </div>

        </div>
        <span className="post-like fa fa-heart-o"></span>
      </Link>
    </li>
  );
};

CompanyItem.propTypes = {
  company: PropTypes.object.isRequired,
};

export default CompanyItem;
