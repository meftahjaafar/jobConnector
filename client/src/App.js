import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Fragment, useEffect } from "react";
// Redux
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import { getCurrentProfile } from "./actions/profile";
import { Provider } from "react-redux";
import store from "./store";
//Compnents
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import AddCompany from "./components/profile-forms/AddCompany";
import AddJob from "./components/profile-forms/AddJob";
import Profile from "./components/profile/Profile";
import Profiles from "./components/profiles/Profiles";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import Jobs from "./components/jobs/Jobs";
import Job from "./components/job/Job";
import Companies from "./components/companies/Companies";

function App() {
  useEffect(() => {
    // check for token in LocalStorage
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
    store.dispatch(getCurrentProfile());
  }, []);

  return (
    <Provider store={store}>
      <div classname="page-wraper">
        <Router>
          <Fragment>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <section className="container">
              <Alert />
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/profile/user/:id"
                  component={Profile}
                />
                <PrivateRoute exact path="/profiles" component={Profiles} />
                <PrivateRoute exact path="/posts" component={Posts} />
                <PrivateRoute exact path="/posts/post/:id" component={Post} />
                <PrivateRoute exact path="/jobs" component={Jobs} />
                <PrivateRoute exact path="/jobs/job/:id" component={Job} />
                <PrivateRoute exact path="/companies" component={Companies} />
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
                <PrivateRoute
                  exact
                  path="/add-company"
                  component={AddCompany}
                />
                <PrivateRoute
                  exact
                  path="/add-job"
                  component={AddJob}
                />
              </Switch>
            </section>
          </Fragment>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
