import React from "react";
import { Link } from "react-router-dom"

const Landing = () => {
  return (
    <div
      className="dez-bnr-inr dez-bnr-inr-md overlay-black-dark"
      style={{
        background: "url(images/main-slider/slide3.jpg)",
      }}
    >
      <div className="container">
        <div className="dez-bnr-inr-entry align-m text-white">
          <h2 className="text-center">The Easiest Way to Get Your New Job</h2>
          <h4>Find Jobs, Employment & Career Opportunities</h4>
          <div className="content-inner-2 call-to-action overlay-black-dark text-white text-center bg-img-fix">
            <h2 className="m-b10">
              Make a Difference with Your Online Resume!
            </h2>
            <p className="m-b0">Create Profile/Portfolio & Share Posts</p>
            <Link to="/register"
              href="#"
              className="site-button m-t20 outline outline-2 radius-xl"
            >
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing