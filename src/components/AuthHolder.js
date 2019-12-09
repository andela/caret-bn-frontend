import React from 'react';
import Signup from './pages/Signup';

const AuthHolder = () => (
    <div className="auth-holder">
        <div>
            <Signup />
        </div>
        <span className="auth-separator">
            <div className="line" />
            <h5>OR</h5>
            <div className="line" />
        </span>
        <div>
            {/* Social Auth */}
            <img width="75%" src="https://pngimage.net/wp-content/uploads/2018/06/login-with-google-png-4.png" alt="Social Auth" />
        </div>
    </div>
);

export default AuthHolder;
