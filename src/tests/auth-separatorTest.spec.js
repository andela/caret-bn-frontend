import React from 'react';
import { shallow } from 'enzyme';
import Separator from '../components/global/auth-separator';

const wrapper = shallow(<Separator  />);

describe('AuthHolder Test Suite', () => {
  it('Should Render auth-separator Component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should render the <h5> message', () => {
    expect(wrapper.find('h5')).toHaveLength(1);
  });
});
