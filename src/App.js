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
import GetAllDeactivatedAccommodations from './views/accommodations/AllDeactivatedAccommodation';
import NewAccommodation from './views/accommodations/NewAccommodation';
import ActivateAccommodations from './views/accommodations/activateAccommodation';
import editAccommodation from './views/accommodations/editAccommodation';
import ManagerView from './views/manager/ManagerView';
import ProtectedRoute from './components/ProtectedRoute';
import UserProfile from './components/pages/profiles/UserProfile';
import PendingBookings from './views/bookings/PendingBookings';
import ViewAllUsers from './views/admin/ViewAllUsers';
import SpecificUSer from './views/admin/SpecificUSer';
import AllNotifications from './views/notifications/AllNotifications';
import MyBookings from './components/pages/MyBookings';
import OneBooking from './components/pages/OneBooking';
import Bookmarks from './views/Bookmarks';
import CommunityChat from './components/pages/chat/CommunityChat';

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
          <Route path="/registered" component={AuthPage} />
          <Route exact path="/users/auth/success" component={SocialAuthSuccess} />
          <Route path="/verify/:token" component={Verify} />
          <Route path="/forgotpassword" component={AuthPage} />
          <Route path="/resetpassword/:token" component={AuthPage} />
          <ProtectedRoute exact path="/requests/create" component={CreateRequest} />
          <ProtectedRoute exact path="/requests" component={ViewRequests} />
          <ProtectedRoute path="/requests/:requestId" component={SingleRequest} />
          <ProtectedRoute path="/accommodations/new" component={NewAccommodation} />
          <ProtectedRoute exact path="/accommodations" component={GetAllAccommodations} />
          <ProtectedRoute exact path="/accommodations/deactivated" component={GetAllDeactivatedAccommodations} />
          <ProtectedRoute exact path="/accommodations/:slug/edit" component={editAccommodation} />
          <ProtectedRoute exact path="/user-manager" component={ManagerView} />
          <ProtectedRoute exact path="/accommodations/:slug" component={GetsingleAccommodation} />
          <ProtectedRoute exact path="/admin/users" component={ViewAllUsers} />
          <ProtectedRoute exact path="/admin/users/:userId" component={SpecificUSer} />
          <ProtectedRoute exact path="/profile" component={UserProfile} />
          <ProtectedRoute exact path="/bookings/pending" component={PendingBookings} />
          <ProtectedRoute exact path="/notifications" component={AllNotifications} />
          <ProtectedRoute exact path="/my-bookings" component={MyBookings} />
          <ProtectedRoute exact path="/bookings/:id" component={OneBooking} />
          <ProtectedRoute exact path="/my-bookmarks" component={Bookmarks} />
          <ProtectedRoute exact path="/community" component={CommunityChat} />
          <ProtectedRoute path="/accommodations/activate/:slug" component={ActivateAccommodations} />
          <ProtectedRoute path="/accommodations/deactivate/:slug" component={ActivateAccommodations} />
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
