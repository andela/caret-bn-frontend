import React from 'react';
import Header from '../components/Header';
import AuthHolder from '../components/global/AuthHolder';

const Authentication = () => (
    <div className="authentication">
        <Header />
        <AuthHolder data-test="auth-holder" />
    </div>
);

export default Authentication;
