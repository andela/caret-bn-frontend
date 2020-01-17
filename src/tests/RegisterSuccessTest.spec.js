import React from 'react';
import { shallow } from 'enzyme';

import RegisterSuccess from '../components/pages/RegisterSuccess';

const wrapper = shallow(<RegisterSuccess />);

describe('RegisterSuccess Test Suite', () => {
  it('Should Render RegisterSuccess Component', () => {
    expect(wrapper.exists()).toBe(true);
  });

});
