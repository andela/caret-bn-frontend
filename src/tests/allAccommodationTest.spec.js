import React from 'react';
import { shallow } from 'enzyme';
import { AllAccommodation , mapStateToProps } from '../components/pages/AllAccommodation';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import Breadcrumbs from '../components/global/Breadcrumbs';
import accommodationsMocks from './mocks/accommodationsMocks';

const middlewares = [thunk];

const mainState = {
  accommodation: {
    accommodationData: null,
    accommodationError: null,
    status: '',
    getAccommodation: [],
    getAccommodationError: {},
    singleAccommodation: {},
    singleAccommodationError: {},
  }
}

const props = {
  props: accommodationsMocks,
  GetAllAccommodation: jest.fn(),
}

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState =  {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
      <AllAccommodation  {...props} store={store} />
  );
    return wrapper;
} 

describe('ViewAllAccommodation Test Suite', () => { 
  it('Should Mount Successfully', () => {
    const component = setUp(mainState); 
    expect(component.find(Breadcrumbs)).toHaveLength(1);
  });

});
