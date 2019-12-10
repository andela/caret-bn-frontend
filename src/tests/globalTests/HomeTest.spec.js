import React from 'react';
import Home from '../../components/Home';
import MenuComponent from '../../components/global/menuBar';
import { shallow } from 'enzyme';

const wrapper = shallow(<Home />);

describe('Home tests', () => {
    it('Should render Home', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('Should find MenuComponent in wrapper', () => {
        expect(wrapper.find(MenuComponent)).toHaveLength(1);
    });
});