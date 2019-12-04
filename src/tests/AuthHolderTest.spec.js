import React from 'react';
import { shallow } from 'enzyme';

import AuthHolder from '../components/AuthHolder';
import Signup from '../components/pages/Signup';

const wrapper = shallow(<AuthHolder  />);

describe('AuthHolder Test Suite', () => {
  it('Should Render AuthHolder Component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should Find Signup In AuthHolder', () => {
    expect(wrapper.find(Signup)).toHaveLength(1);
  });
});