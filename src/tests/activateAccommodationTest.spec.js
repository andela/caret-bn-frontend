import React from 'react';
import { shallow } from 'enzyme';
import ActivateAccommodation from '../views/accommodations/activateAccommodation';


describe('Accommodations view Test Suite', () => {
  const wrapper = shallow(<ActivateAccommodation />);

  it('Should Render Accommodations Component', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
