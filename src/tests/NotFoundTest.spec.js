import React from 'react';
import { shallow } from 'enzyme';

import NotFound from '../components/NotFound';

const wrapper = shallow(<NotFound />);

describe('NotFound Test Suite', () => {
  it('Should render <NotFound />', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should render the <h1> message', () => {
    expect(wrapper.find('h1')).toHaveLength(1);
  });
});
