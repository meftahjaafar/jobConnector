import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

function App() {
  return (
    <Router>
      <Fragment>
        <div id="bg">
          <div id="loading-area"></div>
          <div className="page-wraper">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <section className="container">
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </Switch>
            </section>
          </div>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
