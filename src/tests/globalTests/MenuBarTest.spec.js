import React from 'react';
import { shallow } from 'enzyme';
import { MenuComponent, mapStateToProps } from '../../components/global/MenuComponent';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers/index';
import notificationsMocks from '../mocks/notificationsMocks';

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
    profile: {
      dataError: null,
      data: null,
    },
    allNotifs: {
      notifsData: [notificationsMocks.itemUnread],
      notifsDataError: null,
    },
  },
  notifsData: [notificationsMocks.itemUnread],
  notifsDataError: null,
  GetUserProfile: jest.fn(),
  getNotifsAction: jest.fn(),
  markOneNotifAction: jest.fn(),
 pathname: '/requests'
}

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState =  {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
      <MenuComponent {...props} store={store} />
  );
    return wrapper;
} 

describe('MenuComponent Test Suite', () => { 
  it('Should Mount Successfully', () => {
    const component = setUp(mainState);
    expect(component.exists()).toBe(true);
  });

  it('Should click on notifications', () => {
    const component = setUp(mainState);
    const handleSubmitSpy = jest.spyOn(component.instance(), 'markAllNotifs');
    component.find('[data-test="link-click"]').simulate('click');
    component.find('[data-test="mark-all-click"]').simulate('click');
    expect(handleSubmitSpy).toReturn();
  });

  it('Should return initial data', () => {
    const initialState = {
      profile: {
        dataError: null,
        data: null,
      },
      allNotifs: {
        notifsData: null,
        notifsDataError: null,
      }
    };
    expect(mapStateToProps(initialState).data).toEqual(null);
  });

});
