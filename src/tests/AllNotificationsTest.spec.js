import React from 'react';
import { shallow } from 'enzyme';
import AllNotifications from '../views/notifications/AllNotifications';
import Notifications from '../components/pages/notifications/Notifications';

const wrapper = shallow(<AllNotifications  />);

describe('AllNotifications Test Suite', () => {
  it('Should Render AllNotifications Component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should Find Notifications In AuthHolder', () => {
    expect(wrapper.find(Notifications)).toHaveLength(1);
  });
});
