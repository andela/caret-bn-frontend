import React from 'react';
import googleplusLogo from '../../assets/images/google-plus.png';
import facebookLogo from '../../assets/images/facebook.png';
import ApiConfig from '../../utilities/APIConstants';
import Button from '../global/Button';

const SocialButtons = () => {
  const SignInFacebook = () => {
    location.assign(`${ApiConfig().hostUrl}auth/facebook`);
  };

  const SignInGoogle = () => {
    location.assign(`${ApiConfig().hostUrl}auth/google`);
  };

  return (
    <div className="button-holder">
      <Button name="Facebook" data-test="facebookButton" image={facebookLogo} buttonType="button" styleClass="btn-social btn-facebook" onClick={SignInFacebook} />
      <Button name="Google" data-test="googleButton" image={googleplusLogo} buttonType="button" styleClass="btn-social btn-google" onClick={SignInGoogle} />
    </div>
  );
};

export default SocialButtons;
