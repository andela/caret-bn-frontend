import React from 'react';
import { shallow, mount } from 'enzyme';
import  UserProfile  from '../components/pages/profiles/UserProfile';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import Breadcrumbs from '../components/global/Breadcrumbs';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {BrowserRouter as Router} from 'react-router-dom';
import axios from 'axios';
import sinon from 'sinon';

jest.mock('axios');

let wrapper;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mainState = {
    profile: {
        data: {
          profile: {
                username: 'eric',
                gender: 'male',
                phone: '09409339',
                language: 'lingala',
                country: 'rwanda',
                company: 'andela',
                department: 'it',
                image: 'image.png',
                isLoading: false,
          
              }
        },
        dataError: null,
        status: '',
    },
  };
  
  const event = { target: { username: 'eric', value: 'thatway'}}
  const eventFile = { target: { name: 'eric', files: ['image.png']}}
  const state = {
    username: 'eric',
    gender: 'male',
    phone: '09409339',
    language: 'lingala',
    country: 'rwanda',
    company: 'andela',
    department: 'it',
    image: 'image.png',
    isLoading: false,
  }
  const testStore = (state) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    return createStoreWithMiddleware(rootReducer, state);
  };
  const setUp = (initialState =  {}) => {
    const store = mockStore(initialState);
    wrapper = mount(
        <Provider store={store}>
        <Router><UserProfile /></Router>
        </Provider>
    );
      return wrapper;
  }

  describe('User Profile Test Suite', () => { 
    it('Should Mount Successfully', () => {
      const spy = sinon.spy(axios, 'get');
      axios.get.mockResolvedValue({data: {profile: state}});
      const component = setUp(mainState); 
      expect(component.find(Breadcrumbs)).toHaveLength(1);
      component.find('input[name="selectedFile"]').first().simulate('change', eventFile);
      component.find('input[name="username"]').first().simulate('change', event);
      component.find('#buttonEdit').first().simulate('click');
      component.find('#buttonCancel').first().simulate('click');
      component.find('form').simulate('submit');
      spy.restore();
    });

    it('should test gender element', ()=> {
      const spy = sinon.spy(axios, 'get');
      axios.get.mockResolvedValue({data: {profile: state}});
      const component = setUp(mainState); 
      expect(component.find(Breadcrumbs)).toHaveLength(1);
      spy.restore();
    });
});

