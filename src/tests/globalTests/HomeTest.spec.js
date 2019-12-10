import React from 'react';
import Home from '../../components/Home';
import { shallow } from 'enzyme';

const wrapper = shallow(<Home />);

describe('Home tests', () => {
    it('Should render Home', () => {
      expect(wrapper.exists()).toBe(true);
    });

});