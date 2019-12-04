import React from 'react';
import { shallow } from 'enzyme';

import Authenticaton from '../views/Authentication';
import AuthHolder from '../components/global/AuthHolder';
import NotFound from '../components/NotFound';

const wrapper = shallow(<Authenticaton />);

describe('Authentication Test Suite', () => {
  it('Should render <Authentication />', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should contain AuthHolder Component', () => {
    expect(wrapper.find(AuthHolder)).toHaveLength(1);
  });

  it('Should not contain <NotFound /> Component', () => {
    expect(wrapper.find(NotFound)).toHaveLength(0);
  });
});
