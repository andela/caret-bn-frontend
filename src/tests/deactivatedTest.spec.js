import React from 'react';
import { shallow } from 'enzyme';
import AllDeactivatedAccommodations from '../views/accommodations/AllDeactivatedAccommodation';
const wrapper = shallow(<AllDeactivatedAccommodations />);

describe(' view Deactivated Accommodations Test Suite', () => {
  it('Should Render Deactivated Accommodations Component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should Find CreateAccommodation In Deactivated Accommodations', () => {
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
