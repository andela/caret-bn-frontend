import React from 'react';
import { shallow } from 'enzyme';

import Input from '../../components/global/Input';

const wrapper = shallow(<Input type="email" id="email" name="email" placeholder="Email..." required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value='inputtext' onChange={() => {}} />);

describe('Input Test Suite', () => {
  it('Should Render Input Component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should Render Input type email', () => {
    expect(wrapper.find('input[type="email"]')).toHaveLength(1);
  });
});