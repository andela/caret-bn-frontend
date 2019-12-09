import React from 'react';
import { shallow } from 'enzyme';
import Home  from '../components/Home';
 
const wrapper = shallow(<Home />);

describe('Default Test Suite', () => {
  it('Should return true equal true', () => {
    expect(true).toEqual(true);
  });

  it('Should render <App />', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should render <h1>', () => {
    expect(wrapper.find('h1').text()).toBe('Welcome to barefoot Nomad');
  });

});
