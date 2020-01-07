import React from 'react';
import { shallow } from 'enzyme';
import { MyBookings, mapStateToProps } from '../components/pages/MyBookings';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import bookingsMocks from './mocks/bookingsMocks';

const middlewares = [thunk];

const mainState = {
  bookings: {
    data: null,
    dataError: null,
    booked: null,
    bookedError: null,
    oneBookingData: null,
    oneBookingError: null,
    status: 'success',
  }
}

const props = {
  props: bookingsMocks,
  bookings: {
    data: bookingsMocks,
  },
  status: 'success',
  getOneBooking: jest.fn(),
}

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState =  {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
      <MyBookings {...props} store={store} />
  );
    return wrapper;
} 

describe('View Bookings Test Suite', () => { 
  it('Should Mount Successfully', () => {
    const component = setUp(mainState);
    component.instance().noBookings();
    component.instance().showBookings();
    component.instance().renderStatus({ id: 1, name: 'Pending' });
    component.instance().renderStatus({ id: 2, name: 'Rejected' });
    component.instance().renderStatus({ id: 3, name: 'Approved' });
    expect(component.exists()).toBe(true);
  });

  it('Should Mount No bookings Successfully', () => {
    const component = setUp(mainState);
    component.setState({ isLoading: false })
    component.setProps({ status: 'error' });
    expect(component.exists()).toBe(true);
  });

  it('Should Mount Bookings Successfully', () => {
    const component = setUp(mainState);
    component.setState({ isLoading: false })
    component.setProps({ status: 'success', bookings: { data: bookingsMocks } });
    expect(component.exists()).toBe(true);
  });

  it('Should return initial data', () => {
    const initialState = {
      bookings: {
        data: null,
        dataError: null,
        booked: null,
        bookedError: null,
        oneBookingData: null,
        oneBookingError: null,
        status: 'success',
      }
    };
    expect(mapStateToProps(initialState).status).toEqual('success');
  });

});
