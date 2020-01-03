import React from 'react';
import { shallow } from 'enzyme';
import { NotificationItem, mapStateToProps } from '../../components/pages/notifications/NotificationItem';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers/index';
import notificationsMocks from '../mocks/notificationsMocks';

const middlewares = [thunk];

const mainState = {

}

const props = {
  item: notificationsMocks.itemRead,
  markOneNotifAction: jest.fn(),
  getNotifsAction: jest.fn(),
}

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState =  {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
      <NotificationItem {...props} store={store} />
  );
    return wrapper;
} 

describe('NotificationItem Test Suite', () => { 
  it('Should Mount Successfully', () => {
    const component = setUp(mainState); 
    expect(component.exists()).toBe(true);
  });

  it('Should click on notifications', () => {
    const component = setUp(mainState);
    component.setProps({ item: notificationsMocks.itemUnread });
    const handleSubmitSpy = jest.spyOn(component.instance(), 'markUnmark');
    component.find('[data-test="link-click"]').simulate('click');
    component.find('[data-test="button-click"]').simulate('click');
    expect(handleSubmitSpy).toReturn();
  });

  it('Should return initial data', () => {
    const initialState = {};
    expect(mapStateToProps(initialState)).toEqual({});
  });

});
