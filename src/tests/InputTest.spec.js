import React from 'react';
import { shallow } from 'enzyme';

import Input from '../components/global/Input';

const wrapper = shallow(<Input type="password" name="password" placeholder="Password..." />);

describe('Input field component Test ', () => {
  it('Should Render the Input field Component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should Render Input type email', () => {
    expect(wrapper.find('input[type="password"]')).toHaveLength(1);
  });
});