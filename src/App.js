import PropTypes from 'prop-types';
import React from "react";
import { Routes, Route } from 'react-router-dom';
import { connect } from "react-redux";

import { userRoutes, authRoutes } from "./routes/allRoutes";

import Authmiddleware from "./routes/middleware/Authmiddleware";

import NonAuthLayout from "./components/NonAuthLayout";

import "./assets/scss/theme.scss";

import fakeBackend from "./helpers/AuthType/fakeBackend";

fakeBackend();

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        {/* <Route>
          {authRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <NonAuthLayout>
                  {route.component}
                </NonAuthLayout>
              }
              key={idx}
              exact={true}
            />
          ))}
        </Route> */}

        <Route>
          {userRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <Authmiddleware>
                  {route.component}
                </Authmiddleware>}
              key={idx}
              exact={true}
            />
          ))}
        </Route>
      </Routes>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any
};

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
