import React from 'react';
import { shallow } from 'enzyme';

import Register from '../views/Register';
import Header from '../components/Header';

const wrapper = shallow(<Register  />);

describe('Rgister Test Suite', () => {
  it('Should Render Register Component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should Find Header In Register', () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });
});