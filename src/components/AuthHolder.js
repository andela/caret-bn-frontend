import React from 'react';
import Signup from './pages/Signup';

const AuthHolder = () => (
        <div className="auth-holder">
            <div>
                <Signup />
            </div>
            <div>Social Auth </div>
        </div>
);

export default AuthHolder;
