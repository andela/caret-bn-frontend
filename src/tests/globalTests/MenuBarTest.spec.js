import React from 'react';
import { shallow } from 'enzyme';
import { Navbar } from 'react-bootstrap';

import MenuComponent from '../../components/global/MenuComponent';

const wrapper = shallow(<MenuComponent />);

describe('MenuComponent Test Suite', () => {
  it('Should Render MenuComponent Component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should Return Menubar from react-bootstrap ', () => {
    expect(wrapper.find(Navbar)).toHaveLength(1);
  });
});
