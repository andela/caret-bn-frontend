import React from 'react';
import { shallow } from 'enzyme';
import { ManagerItem, mapStateToProps } from '../components/pages/manager/ManagerItem';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import requestsMocks from './mocks/requestsMocks';

const middlewares = [thunk];

const mainState = {};

const props = {
  item: requestsMocks.itemPending,
  index: 0,
};

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
    <ManagerItem {...props} store={store} />
  );
  return wrapper;
}

describe('ManagerItem Test Suite', () => {
  it('Should Mount Successfully', () => {
    const component = setUp(mainState);
    expect(component.find('[data-test="request-item"]')).toHaveLength(1);
  });

  it('Should Click Approve Successfully', () => {
    const component = setUp(mainState);
    component.dive().find('[data-test="manager-approve"]').simulate('click');
    console.log('ManagerItem Test ===> ', component.instance());
    component.instance().processAction();
    expect(component.dive().find('[data-test="manager-approve"]')).toHaveLength(1);
  });

  it('Should Render ManagerItem Component Rejected', () => {
    const component = setUp(mainState);
    component.setProps({
      item: requestsMocks.itemRejected,
      index: 0,
    });
    expect(component.exists()).toBe(true);
  });

  it('Should Render ManagerItem Component Approved', () => {
    const component = setUp(mainState);
    component.setProps({
      item: requestsMocks.itemApproved,
      index: 0,
    });
    expect(component.exists()).toBe(true);
  });
});
