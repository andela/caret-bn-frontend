import React from 'react';
import { shallow } from 'enzyme';

import Authenticaton from '../views/Authentication';
import Login from '../components/Login';
import NotFound from '../components/NotFound';

const wrapper = shallow(<Authenticaton />);

describe('Authentication Test Suite', () => {
  it('Should render <Authentication />', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should contain <Login /> Component', () => {
    expect(wrapper.find(Login)).toHaveLength(1);
  });

  it('Should not contain <NotFound /> Component', () => {
    expect(wrapper.find(NotFound)).toHaveLength(0);
  });
});
