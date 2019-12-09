import React from 'react';
import SocialButtons from '../pages/SocialButtons';

const Separator = () => (
  <>
    <span className="auth-separator">
      <div className="line" />
      <h5>OR</h5>
      <div className="line" />
    </span>
    <div className="social-auth">
      <SocialButtons />
    </div>
  </>
);


export default Separator;
