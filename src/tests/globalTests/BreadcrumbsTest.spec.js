import React from 'react';
import { shallow } from 'enzyme';
import { Breadcrumb } from 'react-bootstrap';

import Breadcrumbs from '../../components/global/Breadcrumbs';

const wrapper = shallow(<Breadcrumbs itemsArray={ ['Go', 'Home'] } />);

describe('Breadcrumbs Test Suite', () => {
  it('Should Render Breadcrumbs Component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should Render Breadcrumb from react-bootstrap', () => {
    expect(wrapper.find(Breadcrumb)).toHaveLength(1);
  });
});
