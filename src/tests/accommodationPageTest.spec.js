import React from 'react';
import { shallow } from 'enzyme';
import NewAccommodation from '../views/accommodations/NewAccommodation';
import { Redirect } from 'react-router-dom';

const wrapper = shallow(<NewAccommodation  />);

describe('Accommodations view Test Suite', () => {
  it('Should Render Accommodations Component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should Find CreateAccommodation In Accommodations', () => {
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });

});
