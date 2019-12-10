import React from 'react';
import { shallow } from 'enzyme';
import Accommodations from '../views/accommodations/AllAccommodations';
const wrapper = shallow(<Accommodations  />);

describe('Accommodations view Test Suite', () => {
  it('Should Render Accommodations Component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should Find CreateAccommodation In Accommodations', () => {
    expect(wrapper.find('div')).toHaveLength(1);
  });

});
