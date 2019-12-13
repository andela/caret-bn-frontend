import React from 'react';
import { shallow } from 'enzyme';

import RequestItem from '../../components/pages/requests/RequestItem';
import requestsMocks from '../mocks/requestsMocks';

const props = {
  item: requestsMocks.itemPending,
  index: 0,
};

const wrapper = shallow(<RequestItem {...props} />);

describe('RequestItem Test Suite', () => {
  it('Should Render RequestItem Component Pending', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('Should Render RequestItem Component Rejected', () => {
    wrapper.setProps({
      item: requestsMocks.itemRejected,
      index: 0,
    });
    expect(wrapper.exists()).toBe(true);
  });
  it('Should Render RequestItem Component', () => {
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
