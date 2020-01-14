import React from 'react';
import { shallow } from 'enzyme';
import { Notifications, mapStateToProps } from '../../components/pages/notifications/Notifications';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers/index';
import notificationsMocks from '../mocks/notificationsMocks';

const middlewares = [thunk];

const mainState = {
  allNotifs: {
    notifsData: [notificationsMocks.itemRead],
    notifsDataError: null,
  }
}

const props = {
  item: notificationsMocks.itemRead,
  getNotifsAction: jest.fn(),
}

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
    <Notifications {...props} store={store} />
  );
  return wrapper;
}

describe('Notifications Test Suite', () => {
  it('Should Mount Successfully', () => {
    const component = setUp(mainState);
    component.setProps({
      getNotifsAction: jest.fn(),
      markAllNotifAction: jest.fn(),
      notifsData: [
        {
          createdAt: '2019-12-28',
          timestamp: '11:50:09',
        },
        {
          createdAt: '2019-12-28',
          timestamp: '11:50:09',
        },
      ]
    })
    component.instance().markAllUnread()
    expect(component.exists()).toBe(true);
  });

  it('Should return initial data', () => {
    const initialState = {
      allNotifs: {
        notifsData: [],
        notifsDataError: null,
      }
    };
    expect(mapStateToProps(initialState).notifsData).toEqual([]);
  });

});
