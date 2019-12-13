import React from 'react';
import { shallow } from 'enzyme';
import SingleAccommodation from '../components/pages/SingleAccommodation';
import GetsingleAccommodation from '../views/accommodations/SingleAccommodation';

const wrapper = shallow(<GetsingleAccommodation  />);

describe('GetSingleAccommodations view Test Suite', () => {
  it('Should Render Accommodations Component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should Find SingleAccommodation In GetSingleAccommodations', () => {
    expect(wrapper.find(SingleAccommodation)).toHaveLength(1);
  });
});
