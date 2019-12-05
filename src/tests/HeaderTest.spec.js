import React from 'react';
import { shallow } from 'enzyme';
import Header from '../components/global/Header';

const wrapper = shallow(<Header />);

describe('Header Tests ', () => {
  it('Should Render the Header Component ', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should find a h4 Heading ', () => {
    expect(wrapper.find('h4').text()).toBe('A step at a time');
  });
});

