import React from 'react';
import { shallow } from 'enzyme';

import Login from '../components/Login';

const wrapper = shallow(<Login />);

describe('Login Test Suite', () => {
  it('Should render <Login />', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should render the <h3> message', () => {
    expect(wrapper.find('h3')).toHaveLength(1);
  });
});
