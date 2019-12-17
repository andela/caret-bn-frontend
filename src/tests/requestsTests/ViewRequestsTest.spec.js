import React from 'react';
import { shallow } from 'enzyme';
import { ViewRequests, mapStateToProps } from '../../views/requests/ViewRequests';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers/index';
import Breadcrumbs from '../../components/global/Breadcrumbs';
import requestsMocks from '../mocks/requestsMocks';

const middlewares = [thunk];

const mainState = {
  requests: {
    dataError: null,
    data: null,
    singleData: null,
  },
  searchRequests: {
    status: '',
    searchData: null,
    searchDataError: null,
  }
}

const props = {
  props: requestsMocks.viewRequestsProps,
  searchRequests: {
    status: '',
    searchData: null,
    searchDataError: null,
  },
  getRequestsAction: jest.fn(),
}

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState =  {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
      <ViewRequests {...props} store={store} />
  );
    return wrapper;
} 

describe('ViewRequests Test Suite', () => { 
  it('Should Mount Successfully', () => {
    const component = setUp(mainState); 
    expect(component.find(Breadcrumbs)).toHaveLength(1);
  });

  it('Should return initial data', () => {
    const initialState = {
      requests: {
        dataError: null,
        data: null,
        singleData: null,
      },
      searchRequests: {
        status: '',
        searchData: null,
        searchDataError: null,
      }
    };
    expect(mapStateToProps(initialState).data).toEqual(null);
  });

});
