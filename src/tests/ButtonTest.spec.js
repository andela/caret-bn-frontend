import React from 'react';
import { shallow } from 'enzyme';

import Button from '../components/global/Button';

const wrapper = shallow(<Button name="button" />);

describe('Button Test Suite', () => {
  it('Should Render Button Component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should Render AWESOME Button', () => {
    const awesomeButton = shallow(<Button name="awesome" />);
    expect(awesomeButton.find('button').text()).toBe('awesome');
  });
}); 