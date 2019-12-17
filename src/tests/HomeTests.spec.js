import React from 'react';
import Home from './../views/Home';
import mockStore from './../utilities/tests/mockStore';
import { shallow } from 'enzyme';
import findTestByAttribute from '../utilities/tests/findByTestAttribute';

const setUp = (initialState = {}) => {
  const store = mockStore(initialState);
  const wrapper = shallow(<Home store={store} />)
    .childAt(0)
    .dive();
  return wrapper;
};

describe('Home tests', () => {
  const state = {
    auth: {
      user: null,
    },
  };

  it('should redirect if no state is provided', () => {
    const component = setUp(state);
    expect(component.debug()).toEqual('<Fragment />');
  });
});
