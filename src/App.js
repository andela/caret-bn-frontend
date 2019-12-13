import React from 'react';
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router, Route, Switch, withRouter, Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthPage from './views/Authentication';
import NotFound from './components/NotFound';
import SocialAuthSuccess from './views/SocialAuthSuccess';
import ViewRequests from './views/requests/ViewRequests';
import Home from './views/Home';
import Verify from './views/Verify';
import SingleRequest from './views/requests/SingleRequest';
import MenuComponent from './components/global/MenuComponent';
import isAuth from './helpers/isAuthenticated';

const App = (props) => {
  const { location: { pathname } } = props;
  const urls = ['/login', '/register', '/forgotpassword'];
  const displayMenu = (urls.includes(pathname) || pathname.match(/resetpassword/) || pathname.match(/verify/)) ? null : <MenuComponent />;

  const authRoute = (component) => (isAuth() ? component : <Redirect to="/login" />);

  return (
      <Router>
        {displayMenu}
        <Switch>
          <Route exact path="/" render={() => (authRoute(<Home />))} />
          <Route path="/login" component={AuthPage} />
          <Route path="/register" component={AuthPage} />
          <Route exact path="/users/auth/success" render={() => (authRoute(<SocialAuthSuccess />))} />
          <Route path="/verify/:token" component={Verify} />
          <Route path="/forgotpassword" component={AuthPage} />
          <Route path="/resetpassword/:token" component={AuthPage} />
          <Route exact path="/requests" render={() => (authRoute(<ViewRequests />))} />
          <Route path="/requests/:requestId" render={() => (authRoute(<SingleRequest />))} />
          <Route path="*" component={NotFound} />
        </Switch>
        <ToastContainer />
      </Router>
  );
};

App.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(App);
