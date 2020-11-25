import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [items] = useState([
    { label: "Job Seeker", value: "jobSeeker" },
    { label: "HR Recruiter", value: "hrRecruiter" },
  ]);

  const [type, setType] = React.useState("");
  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("passwords do not match !");
    } else {
      console.log("Success!");
    }
  };
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

                  <h6 className="widget-title font-weight-700 text-uppercase">
                    Choose Account Type
                  </h6>

                  <select
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.currentTarget.value)}
                  >
                    {items.map(({ label, value }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>

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

export default Register;
