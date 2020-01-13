import React from 'react';
import { shallow } from 'enzyme';

import Message from '../components/pages/chat/Messages';

const wrapper = shallow(<Message render={() => jest.fn()} />);

describe('Message Test Suite', () => {
  it('Should render <Message />', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
