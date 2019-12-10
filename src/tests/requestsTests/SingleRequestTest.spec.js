import React from 'react';
import { shallow } from 'enzyme';
import { SingleRequest, mapStateToProps } from '../../views/requests/SingleRequest';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers/index';
import Breadcrumbs from '../../components/global/Breadcrumbs';

const middlewares = [thunk];

const mainState = {
  requests: {
    dataError: null,
    data: null,
    singleData: null,
  }
}

const props = {
  props: {
    requests: {
      dataError: null,
      data: null,
      singleData: null,
    }
  },
  singleRequestAction: jest.fn(),
  match: {
    params: 2,
  }
}

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState =  {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
      <SingleRequest {...props} store={store} />
  );
    return wrapper;
} 

describe('SingleRequest Test Suite', () => { 
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
      }
    };
    expect(mapStateToProps(initialState).singleData).toEqual(null);
  });

});
