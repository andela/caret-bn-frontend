import React from 'react';
import { shallow } from 'enzyme';
import { Forgotpassword, mapStateToProps } from '../components/pages/ForgotPassword';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const middlewares = [thunk];

const mainState = {
  response: {
    pass: {},
    passwordError: {}
  }
}

const props = {
  props: {
    response: {
      pass: {},
      passwordError: {}
    }
  },
  ResetAction: jest.fn(),
  setTimeout: jest.fn()
}

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState =  {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
      <Forgotpassword {...props} store={store} />
  );
    return wrapper;
} 

describe('Rest Password Test Suite', () => { 
  it('Should Mount Successfully', () => {
    const component = setUp(mainState); 
    const handleSubmitSpy = jest.spyOn(component.instance(), 'handleSubmit');
    const email = { target: { name: 'email', value: 'careuser@gmail.com' } };
    
    component.find('[data-test="email"]').simulate('change', email);
    component.find('[data-test="submitButton"]').simulate('click');
    component.find('form').simulate('submit', {
      preventDefault() {},
      setTimeout() {}
    });
    expect(component.find('h2')).toHaveLength(1);
  });

  it('Should update state', () => {
    const component = setUp(mainState); 
    component.setProps({ data: null, error: {}})
    expect(component.find('h2')).toHaveLength(1);
  });

  it('Should return initial data', () => {
    const initialState = {
      response: {
        pass: {},
        passwordError: {}
      }
  };  
  expect(mapStateToProps(initialState).data).toEqual({});
  });

});
