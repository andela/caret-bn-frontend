import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/global/Header';
import AuthHolder from '../components/global/AuthHolder';

const Verify = (props) => {
  const { match: { params } } = props;
  const { token } = params;

  return (
    <div className="authentication">
        <Header />
        <AuthHolder token={token} />
    </div>
  );
};
Verify.propTypes = {
  token: propTypes.string,
  match: propTypes.object.isRequired,
  params: propTypes.object,
};
export default Verify;
