import React from 'react';
import { shallow, mount } from 'enzyme';
import { Signup } from '../components/pages/Signup';
import Input from '../components/global/Input';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import {BrowserRouter as Router} from 'react-router-dom';

const middlewares = [thunk];

const mainState = {
  auth: {
    dataError: {},
    status: 'status'
  }
}

const props = {
  props: {
    signup: {
      data: null,
      dataError: null,
      status: '',
    }
  },
  history: {

  },
  signupAction: jest.fn()

}

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState =  {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
      <Signup {...props} store={store} />
  );
    return wrapper;
} 

describe('Signup Test Suite', () => { 

    it('Should Mount Successfully', () => {
    const component = setUp(mainState); 
    const handleSubmitSpy = jest.spyOn(component.instance(), 'handleSubmit');
		const email = { target: { name: 'email', value: 'johndoe@gmail.com' } };
		const username = { target: { name: 'username', value: 'johndoe' } };
		const password = { target: { name: 'password', value: 'Pa$5w0rd' } };
    const confirmPassword = { target: { name: 'confirmPassword', value: 'Pa$5w0rd' } };
    
    component.find('[data-test="email"]').simulate('change', email);
    component.find('[data-test="password"]').simulate('change', password);
    component.find('[data-test="username"]').simulate('change', username);
    component.find('[data-test="confirmPassword"]').simulate('change', confirmPassword);
    component.find('[data-test="submitButton"]').simulate('click');
    component.find('form').simulate('submit', {
      preventDefault() {},
    });

    expect(handleSubmitSpy).toReturn();
    });

    it('Should Simulate Successfull Signup', () => {
      const component = setUp(mainState); 
      component.setProps({history: {push: jest.fn()}, status: 'success'});
      const { push } = component.instance().props.history;
      expect(push).toHaveBeenCalledWith('/'); 
  }); 

    it('Should Simulate Failed Signup', () => {
      const component = setUp(mainState); 
      component.setProps({history: {push: jest.fn()}, dataError: { data: { message: 'Failed' } }, status: 'error'});
      const { push } = component.instance().props.history;
      expect(push).toHaveBeenCalledTimes(0); 
  }); 

    it('Should Simulate Default Status', () => {
      const component = setUp(mainState); 
      component.setProps({history: {push: jest.fn()}, status: ''});
      const { push } = component.instance().props.history;
      expect(push).toHaveBeenCalledTimes(0); 
  }); 
});
