import React from 'react';
import { shallow } from 'enzyme';
import { OneBooking, mapStateToProps } from '../components/pages/OneBooking';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import Breadcrumbs from '../components/global/Breadcrumbs';
import bookingsMocks from './mocks/bookingsMocks';

const middlewares = [thunk];

const mainState = {
  bookings: {
    oneBookingError: null,
    oneBookingData: null,
    status: '',
  }
}

const props = {
  props: {
    bookings: {
      oneBookingError: null,
      oneBookingData: null,
      status: '',
    }
  },
  getOneBooking: jest.fn(),
  match: {
    params: 2,
  }
}

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
    <OneBooking {...props} store={store} />
  );
  return wrapper;
}

describe('OneBooking Test Suite', () => {
  it('Should Mount Successfully', () => {
    const component = setUp(mainState);
    expect(component.find(Breadcrumbs)).toHaveLength(1);
  });

  it('Should return initial data', () => {
    const initialState = {
      bookings: {
        oneBookingError: null,
        oneBookingData: null,
        status: '',
      }
    };
    expect(mapStateToProps(initialState).oneBooking).toEqual(null);
  });

  it('Should switch through status', () => {
    const component = setUp(mainState);
    const renderStatusSpy = jest.spyOn(component.instance(), 'renderStatus');
    component.instance().renderStatus({
      id: 1,
      name: 'Pending',
    });
    component.instance().renderStatus({
      id: 3,
      name: 'Approved',
    });
    component.instance().renderStatus({
      id: 2,
      name: 'Rejected',
    });

    expect(renderStatusSpy).toBeCalled();
  });
});
