import React from 'react';
import { shallow } from 'enzyme';

import ProtectedRoute from '../components/ProtectedRoute';

const wrapper = shallow(<ProtectedRoute />);

describe('ProtectedRoute Test Suite', () => {
  it('Should render <ProtectedRoute />', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
