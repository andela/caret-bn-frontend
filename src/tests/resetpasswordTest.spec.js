import React from 'react';
import { shallow } from 'enzyme';
import { ResetPassword, mapStateToProps } from '../components/pages/Resetpassword';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import { Redirect } from 'react-router-dom';

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
  ChangePasswordAction: jest.fn()
}

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState =  {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
      <ResetPassword {...props} store={store} />
  );
    return wrapper;
} 

describe('Rest Password Test Suite', () => { 
  it('Should Mount Successfully', () => {
    const component = setUp(mainState); 
    const handleSubmitSpy = jest.spyOn(component.instance(), 'handleSubmit');
    const password = { target: { name: 'password', value: 'Pa$5w0rd' } };
    const confirmPassword = { target: { name: 'confirmPassword', value: 'Pa$5w0rd' } };
    
    component.find('[data-test="password"]').simulate('change', password);
    component.find('[data-test="confirmPassword"]').simulate('change', confirmPassword);
    component.find('[data-test="submitButton"]').simulate('click');
    component.find('form').simulate('submit', {
      preventDefault() {},
    });
    
  expect(handleSubmitSpy).toReturn();
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
