import React from 'react';
import { shallow } from 'enzyme';
import AuthHolder from '../components/global/AuthHolder';
import Signup from '../components/pages/Signup';
import Login from '../components/pages/Login';
import UserVerify from '../components/pages/UserVerify';

const wrapper = shallow(<AuthHolder  />);

describe('AuthHolder Test Suite', () => {
  it('Should Render AuthHolder Component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should Find Signup In AuthHolder', () => {
    expect(wrapper.find(Signup)).toHaveLength(1);
  });
  it('Should Render the AthHolder Component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should Find Login component ', () => {
    expect(wrapper.find(Login)).toHaveLength(1);
  });

  it('Should Find User verify In AuthHolder', () => {
    expect(wrapper.find(UserVerify)).toHaveLength(1);
  });
});
