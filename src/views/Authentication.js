import React from 'react';
import Header from '../components/global/Header';
import AuthHolder from '../components/global/AuthHolder';

const Authentication = (props) => {
const { token } = props.match.params;
return (
        <div className="authentication">
            <Header />
            <AuthHolder data-test="auth-holder" token={token} />
        </div>
)
};

export default Authentication;
