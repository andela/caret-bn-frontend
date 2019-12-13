/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router, Route, Switch, withRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthPage from './views/Authentication';
import NotFound from './components/NotFound';
import CreateRequest from './views/requests/CreateRequests';
import SocialAuthSuccess from './views/SocialAuthSuccess';
import ViewRequests from './views/requests/ViewRequests';
import Home from './views/Home';
import Verify from './views/Verify';
import SingleRequest from './views/requests/SingleRequest';
import GetsingleAccommodation from './views/accommodations/SingleAccommodation';
import MenuComponent from './components/global/MenuComponent';
import GetAllAccommodations from './views/accommodations/AllAccommodations';
import NewAccommodation from './views/accommodations/NewAccommodation';
import editAccommodation from './views/accommodations/editAccommodation';
import ProtectedRoute from './components/ProtectedRoute';
import UserProfile from './components/pages/profiles/UserProfile';

import ViewAllUsers from './views/admin/ViewAllUsers';
import SpecificUSer from './views/admin/SpecificUSer';

export class App extends Component {
  render() {
    const { location: { pathname } } = this.props;

    return (
      <Router>
        <MenuComponent pathname={pathname} />
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <Route path="/login" component={AuthPage} />
          <Route path="/register" component={AuthPage} />
          <ProtectedRoute exact path="/users/auth/success" component={SocialAuthSuccess} />
          <Route path="/verify/:token" component={Verify} />
          <Route path="/forgotpassword" component={AuthPage} />
          <Route path="/resetpassword/:token" component={AuthPage} />
          <ProtectedRoute exact path="/requests/create" component={CreateRequest} />
          <ProtectedRoute exact path="/requests" component={ViewRequests} />
          <ProtectedRoute path="/requests/:requestId" component={SingleRequest} />
          <ProtectedRoute path="/accommodations/new" component={NewAccommodation} />
          <ProtectedRoute exact path="/accommodations" component={GetAllAccommodations} />
          <ProtectedRoute exact path="/accommodations/:slug/edit" component={editAccommodation} />
          <ProtectedRoute exact path="/accommodations/:slug" component={GetsingleAccommodation} />
          <ProtectedRoute exact path="/admin/users" component={ViewAllUsers} />
          <ProtectedRoute exact path="/admin/users/:userId" component={SpecificUSer} />
          <ProtectedRoute exact path="/profile" component={UserProfile} />
          <ProtectedRoute path="*" component={NotFound} />
        </Switch>
        <ToastContainer />
      </Router>
    );
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(App);
