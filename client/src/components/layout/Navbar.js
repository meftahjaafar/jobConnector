import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { Link } from "react-router-dom";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Fragment>
      <div className="extra-nav">
        <div className="extra-cell" onClick={logout}>
          <Link to="/" className="site-button">
            <i className="fa fa-sign-out"></i> Logout
          </Link>
        </div>
      </div>
      <div
        className="header-nav navbar-collapse collapse justify-content-start"
        id="navbarNavDropdown"
      >
        <ul className="nav navbar-nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">
              For Candidates <i className="fa fa-chevron-down"></i>
            </Link>
            <ul className="sub-menu">
            <li>
                <Link to="/profiles" className="dez-page">
                  Profiles
                </Link>
              </li>
              <li>
                <Link to="/" className="dez-page">
                  Browse Job
                </Link>
              </li>
              <li>
                <Link to="/" className="dez-page">
                  companies
                </Link>
              </li>
              <li>
                <Link to="/" className="dez-page">
                  Job Detail
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/">
              For Employers <i className="fa fa-chevron-down"></i>
            </Link>
            <ul className="sub-menu">
              <li>
                <Link to="/" className="dez-page">
                  Browse Candidates
                </Link>
              </li>
              <li>
                <Link to="/" className="dez-page">
                  Submit Resume
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/">Pages</Link>
          </li>
          <li>
            <Link to="/dashboard"> Dashboard </Link>
          </li>
        </ul>
      </div>
    </Fragment>
  );

  const guestLinks = (
    <div className="extra-nav">
      <div className="extra-cell">
        <Link to="/register" className="site-button">
          <i className="fa fa-user"></i> Sign Up
        </Link>
        <Link to="/login" className="site-button">
          <i className="fa fa-lock"></i> login
        </Link>
      </div>
    </div>
  );
  return (
    <div className="page-wraper">
      <header className="site-header mo-left header fullwidth">
        <div className="sticky-header main-bar-wraper navbar-expand-lg">
          <div className="main-bar clearfix">
            <div className="container clearfix">
              <div className="logo-header mostion">
                <Link to="/">
                  <img src="images/logo.png" className="logo" alt="" />
                </Link>
              </div>
              {!loading && (
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
