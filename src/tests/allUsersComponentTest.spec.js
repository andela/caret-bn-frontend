import React from 'react';
import { shallow } from 'enzyme';
import ViewAllUsers from '../views/admin/ViewAllUsers';

const wrapper = shallow(<ViewAllUsers  />);

describe('All users Test suite', () => {
  it('Should Render ViewUsers Component', () => {
    expect(wrapper.exists()).toBe(true);
  });
  
});
