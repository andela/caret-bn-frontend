import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

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
            <div>
                <img width="75%" src="https://pngimage.net/wp-content/uploads/2018/06/login-with-google-png-4.png" alt="Social Auth" />
            </div>
        </div>
  );
}
