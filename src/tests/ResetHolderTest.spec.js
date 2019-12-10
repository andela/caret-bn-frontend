import React from 'react';
import { shallow } from 'enzyme';
import AuthHolder from '../components/global/AuthHolder';
import Forgotpassword from '../components/pages/ForgotPassword';
import ResetPassword from '../components/pages/Resetpassword';

const wrapper = shallow(<AuthHolder  />);

describe('ForgetHolder Test Suite', () => {
  it('Should Render the ResetHolder Component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should Find ForgotPassword component ', () => {
    expect(wrapper.find(Forgotpassword)).toHaveLength(1);
  });
  
  it('Should Find ResetPassword component ', () => { 
    expect(wrapper.find(ResetPassword)).toHaveLength(1);
  });
}); 