import React from 'react';
import { shallow } from 'enzyme';
import Home from '../views/Home';

const wrapper = shallow(<Home  />);

describe('Accommodations view Test Suite', () => {
  it('Should Render Home Component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  });
