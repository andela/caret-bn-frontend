import React from 'react';
import { shallow } from 'enzyme';
import { ManagerView, mapStateToProps } from '../views/manager/ManagerView';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import Breadcrumbs from '../components/global/Breadcrumbs';
import requestsMocks from './mocks/requestsMocks';

const middlewares = [thunk];
const mainState = {
  requests: {
    dataError: null,
    data: null,
    singleData: null,
  },
  managerSearchRequest: {
    status: '',
    managerSearchData: null,
    managerSearchDataError: null,
  }
}

const props = {
  props: requestsMocks.managerViewRequestsProps,
  managerSearchRequest: {
    status: '',
    managerSearchData: null,
    managerSearchDataError: null,
  },
  getRequestsAction: jest.fn(),
  getManagerRequestAction: jest.fn(),
}

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState =  {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
      <ManagerView {...props}   store={store} />
  );
    return wrapper;
} 

describe('ManagerView Test Suite', () => { 
  it('Should Mount Successfully', () => {
    const component = setUp(mainState); 
    component.instance().renderResults(requestsMocks.data, requestsMocks.dataError)
    expect(component.find(Breadcrumbs)).toHaveLength(1);
  });
});
