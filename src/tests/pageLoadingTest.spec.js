import React from 'react';
import { mount } from 'enzyme';

import PageLoading from '../components/global/PageLoading';

const wrapper = mount(<PageLoading />);

describe('ProtectedRoute Test Suite', () => {
  it('Should render <PageLoading />', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
