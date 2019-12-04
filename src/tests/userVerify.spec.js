import React from 'react';
import { shallow } from 'enzyme';
import { VerifyUser, mapStateToProps } from '../components/pages/UserVerify';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import { Redirect } from 'react-router-dom';

const middlewares = [thunk];

const mainState = {
  verify: {
    payload: {
        payload: null,
        error: null,
    }
  }
}

const props = {
    verify: {
        payload: null,
        error: null,
  },
  VerifyUsers: jest.fn()
}

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState =  {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
      <VerifyUser {...props} store={store} />
  );
    return wrapper;
} 

describe('VerifyUser Test Suite', () => { 
  it('Should Mount Successfully', () => {
    const component = setUp(mainState); 
    expect(component.find('h4')).toHaveLength(1);
  });

  it('Should Simulate Successfull Verification', () => {
    const component = setUp(mainState); 
    component.setProps({
        verify: {
            payload: {},
            error: null
        }
    });
    expect(component.find(Redirect)).toHaveLength(1);
  });

  it('Should Simulate Failed Verification', () => {
    const component = setUp(mainState); 
    component.setProps({
        verify: {
            payload: null,
            error: {}
        }
    });
    expect(component.find(Redirect)).toHaveLength(1);
  }); 

  it('Should return initial data', () => {
    const initialState = {
        verify: {
            payload: null,
            error: null,
      },
    };
    expect(mapStateToProps(initialState).verify.error).toEqual(null);
  });

});
