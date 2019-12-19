import React from 'react';
import { mount } from 'enzyme';
import { Provider } from "react-redux";
import { Alert } from 'react-bootstrap';
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const mockStore = configureStore([thunk])


import AlertComponent from '../../components/global/AlertComponent';
const state = {
  alert: {
    isShown: true,
  }
};

const store = mockStore(state);
const wrapper = mount(
  <Provider store={store}>
    <AlertComponent variant="success" heading="Yeeeaaahhh" message="Congrats! You made it here!" />
  </Provider>);

describe('AlertComponent Test Suite', () => {
  it('Should Render AlertComponent Component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  // it('Should Render Alert from react-bootstrap', () => {
  //   expect(wrapper.find(Alert)).toHaveLength(1);
  // });
});