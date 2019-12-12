import React from 'react';
import { shallow } from 'enzyme';
import { Alert } from 'react-bootstrap';

import AlertComponent from '../../components/global/AlertComponent';

const wrapper = shallow(<AlertComponent variant="success" heading="Yeeeaaahhh" message="Congrats! You made it here!" />);

describe('AlertComponent Test Suite', () => {
  it('Should Render AlertComponent Component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should Render Alert from react-bootstrap', () => {
    expect(wrapper.find(Alert)).toHaveLength(1);
  });
});