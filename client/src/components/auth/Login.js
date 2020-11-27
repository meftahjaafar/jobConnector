import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };
  if(isAuthenticated){
    return <Redirect to='dashboard' />
  }
  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="font-weight-700 m-t0 m-b20">
              <i className="fa fa-user"></i>Sign into Your Account
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 m-b30">
            <div className="p-a30 border-1  max-w500 m-auto">
              <div className="tab-content">
                <form
                  id="login"
                  className="tab-pane active"
                  onSubmit={(e) => onSubmit(e)}
                >
                  <div className="form-group">
                    <label className="font-weight-700">E-MAIL *</label>
                    <input
                      name="email"
                      className="form-control"
                      placeholder="Your Email Id"
                      type="email"
                      autoComplete="off"
                      value={email}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="font-weight-700">PASSWORD *</label>
                    <input
                      name="password"
                      className="form-control"
                      placeholder="Type Password"
                      type="password"
                      autoComplete="off"
                      value={password}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="text-left">
                    <button className="site-button  outline outline-2">
                      LOGIN
                    </button>
                  </div>
                  <p className="font-weight-400">
                    {" "}
                    Don't have an account?
                    <Link to="/register">
                      <span style={{ color: "#2e55fa", fontWeight: "bold" }}>
                        Sign Up
                      </span>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}
const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);
