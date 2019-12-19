import React from 'react';
import { shallow } from 'enzyme';
import SpecificUSer from '../views/admin/SpecificUSer';

const wrapper = shallow(<SpecificUSer  match={{params: 1}} />);

describe('All users Test suite', () => {
  it('Should Render ViewUsers Component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  
});
