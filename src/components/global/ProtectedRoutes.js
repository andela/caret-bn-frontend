/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import authHelper from '../../helpers/authHelper';

const { checkSupplier } = authHelper;

const pass = checkSupplier();

class ProtectedRoutes extends Component {
  render() {
    const { path, ComponentView } = this.props;
    return (
      <Route
        exact
        path={path}
        render={(props) => (pass ? (<ComponentView {...props} />) : (<Redirect to="/login" />)
        )}
      />
    );
  }
}


export default ProtectedRoutes;
