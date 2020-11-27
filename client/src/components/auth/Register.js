import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import Select from "react-select";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };
  const options = [
    { value: "jobSeeker", label: "Job Seeker" },
    { value: "hrRecruiter", label: "HR Recruiter" },
  ];
  const [formData, setformData] = useState(initialState);
  const [role, setRole] = useState({ selectedOption: null });
  const { name, email, password, password2 } = formData;
  const { selectedOption } = role;
  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const handleChange = (selectedOption) => {
    setRole({ selectedOption });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("passwords do not match!", "danger");
    } else {
      const type= selectedOption.value;
      const newUser = {
        name,
        email,
        password,
        type
      };
      register(newUser);
    }
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
              <i className="fa fa-user"></i>Create An Account
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
                    <input
                      name="name"
                      className="form-control"
                      placeholder="Your UserName"
                      type="text"
                      autoComplete="off"
                      value={name}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="form-group">
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
                    <h6 className="widget-title font-weight-700 text-uppercase">
                      Choose Account Type
                    </h6>

                    <Select
                      value={selectedOption}
                      onChange={handleChange}
                      options={options}
                    />
                  </div>

                  <div className="form-group">
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
                  <div className="form-group">
                    <input
                      name="password2"
                      className="form-control "
                      placeholder="Confirm Password"
                      type="password"
                      autoComplete="off"
                      value={password2}
                      onChange={(e) => onChange(e)}
                    />
                  </div>

                  <div className="text-left">
                    <button className="site-button  outline outline-2">
                      CREATE ACCOUNT
                    </button>
                  </div>
                  <p className="font-weight-400">
                    {" "}
                    Already have an account?
                    <Link to="/login">
                      <span style={{ color: "#2e55fa", fontWeight: "bold" }}>
                        Sign In
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}
const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { setAlert, register })(Register);
