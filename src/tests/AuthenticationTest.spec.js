import React from 'react';
import { shallow } from 'enzyme';
import Authenticaton from '../views/Authentication';
import NotFound from '../components/NotFound';
import findByTestAttribute from '../utilities/tests/findByTestAttribute';

const wrapper = shallow(<Authenticaton />);

describe('Authentication Test Suite', () => {
  it('Should render <Authentication />', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should contain AuthHolder Component', () => {
    const authHolder = findByTestAttribute(wrapper, 'auth-holder');
    expect(authHolder.length).toBe(1);
  });

  it('Should not contain <NotFound /> Component', () => {
    expect(wrapper.find(NotFound)).toHaveLength(0);
  });
});
