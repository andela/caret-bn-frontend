import React from 'react';
import { shallow } from 'enzyme';

import RateItem from '../components/pages/RateItem';

const props = {
  rating: {
    userImage: 'https://myimage.com',
    feedback: 'my feedback',
    rating: 3,
    username: 'user'
  }
}
const wrapper = shallow(<RateItem rating={props} />);

describe('ProtectedRoute Test Suite', () => {
  it('Should render Rate Item>', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
