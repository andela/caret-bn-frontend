import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import SocialButtons from '../pages/SocialButtons';

export default function AuthHolder() {
  return (
        <div className="auth-holder">
            <div>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Signup />
                </Route>
            </div>
            <span className="auth-separator">
                <div className="line" />
                <h5>OR</h5>
                <div className="line" />
            </span>
            <div className="social-auth">
                <SocialButtons />
            </div>
        </div>
  );
}
