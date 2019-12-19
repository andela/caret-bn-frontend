import React from 'react';
import { shallow } from 'enzyme';
import ManagerItem from '../components/pages/manager/ManagerItem';
import requestsMocks from './mocks/requestsMocks';

const props = {
  item: requestsMocks.itemPending,
  index: 0,
};

const wrapper = shallow(<ManagerItem  {...props} />);

describe('ManagerItem Test Suite', () => {
  it('Should Render ManagerItem Component Pending', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('Should Render ManagerItem Component Rejected', () => {
    wrapper.setProps({
      item: requestsMocks.itemRejected,
      index: 0,
    });
    expect(wrapper.exists()).toBe(true);
  });
  it('Should Render ManagerItem Component', () => {
    wrapper.setProps({
      item: requestsMocks.itemApproved,
      index: 0,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('Should find request-item', () => {
    expect(wrapper.find('[data-test="request-item"]')).toHaveLength(1);
  });
});
