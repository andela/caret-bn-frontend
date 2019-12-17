import React from 'react';
import { shallow } from 'enzyme';

import MenuComponent from '../../components/global/MenuComponent';

const props = {
  pathname: '/requests',
};

const wrapper = shallow(<MenuComponent {...props} />);

describe('MenuComponent Test Suite', () => {
  it('Should Render MenuComponent Component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should Return Menubar from react-bootstrap ', () => {
    expect(wrapper.find('[data-test="menu-test"]')).toHaveLength(1);
  });

  it('Should not Return Menubar from react-bootstrap ', () => {
    wrapper.setProps({ pathname: '/login' })
    expect(wrapper.find('[data-test="menu-test"]')).toHaveLength(0);
  });
});
