import React from 'react';
import { shallow } from 'enzyme';

import Header from '../../components/Header';

const wrapper = shallow(<Header />);

describe('Header Test Suite', () => {
  it('Should Render Header Component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should find h2=Barefoot Nomad ', () => {
    expect(wrapper.find('h2').text()).toBe('Barefoot Nomad');
  });
});