import React from 'react';
import { shallow } from 'enzyme';
import { SingleAccommodation, mapStateToProps } from '../components/pages/SingleAccommodation';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import Breadcrumbs from '../components/global/Breadcrumbs';

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
  },
};

const props = {
  accommodation: {
    ratings: [],
    images: [],
  },
};

const testStore = state => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  console.log('store', store.getState());
  const wrapper = shallow(<SingleAccommodation {...props} />);
  wrapper.setState({ isLoading: false });
  return wrapper;
};

describe('ViewSingleAccommodation Test Suite', () => {
  it('Should Mount Successfully', () => {
    const component = setUp(mainState);
    expect(component.find(Breadcrumbs)).toHaveLength(1);
  });

  it('Should return initial data', () => {
    const initialState = {
      accommodation: {
        accommodationData: null,
        accommodationError: null,
        status: '',
        getAccommodation: [],
        getAccommodationError: {},
        singleAccommodation: {},
        singleAccommodationError: {},
      }
    };
    expect(mapStateToProps(initialState).accommodation).toEqual({});
  });
});
