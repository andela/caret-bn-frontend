import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import SocialButtons from '../pages/SocialButtons';
import Separator from './auth-separator';
import UserVerify from '../pages/UserVerify';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/Resetpassword';

export default function AuthHolder(props) {
  return (
        <div className="auth-holder">
            <Route path="/login">
                <Login />
                <Separator />
            </Route>
            <Route path="/register">
                <Signup />
                <Separator />
            </Route>
            <Route path="/verify/:token">
                <UserVerify token={props.token} />
            </Route>
            <Route path="/forgotpassword">
                        <ForgotPassword />
            </Route>
                <Route path="/resetpassword/:token">
                        <ResetPassword token={props.token} />
                </Route>
        </div>
  );
}
