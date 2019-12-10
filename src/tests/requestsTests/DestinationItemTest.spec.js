import React from 'react';
import { shallow } from 'enzyme';

import DestinationItem from '../../components/pages/requests/DestinationItem';
import requestsMocks from '../mocks/requestsMocks';

const props = {
  destination: requestsMocks.destination,
  index: 0,
};

const wrapper = shallow(<DestinationItem {...props} />);

describe('DestinationItem Test Suite', () => {
  it('Should Render DestinationItem Component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should find destination-item', () => {
    expect(wrapper.find('[data-test="destination-item"]')).toHaveLength(1);
  });
});
