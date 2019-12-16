/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import isAuth from '../helpers/isAuthenticated';

export default class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props;
    return (
      <Route {...props} render={(props) => (isAuth() ? <Component {...props} /> : window.location.replace('/login'))} />
    );
  }
}

ProtectedRoute.propTypes = {
  component: PropTypes.any,
};
