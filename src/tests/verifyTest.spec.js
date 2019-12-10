import React from 'react';
import { shallow } from 'enzyme';

import Verify from '../views/Verify';
import Header from '../components/global/Header';

const props = {match: { params: 'jjsjhj'}}

const wrapper = shallow(<Verify {...props}/>);

describe('Rgister Test Suite', () => {
  it('Should Render Verify Component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should Find Header In Verify', () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });
});
