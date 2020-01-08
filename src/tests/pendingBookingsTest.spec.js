import React from 'react';
import { shallow } from 'enzyme';
import PendingBookings from '../views/bookings/PendingBookings';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import Breadcrumbs from '../components/global/Breadcrumbs';
import findByTestAttribute from '../utilities/tests/findByTestAttribute'

const middlewares = [thunk];

const mainState = {
  userId: null,
  isLoading: true
};

const props = {};

const testStore = state => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<PendingBookings {...props} store={store} />).childAt(0).dive();
  return wrapper;
};

describe('Make booking Test Suite', () => {
  it('Should Display when loading', () => {

    const component = setUp(mainState);
    const loader = findByTestAttribute(component, 'loading');

    expect(loader).toHaveLength(1);
  });

  it('Should Display when no pending bookings available', () => {

    const component = setUp(mainState);

    component.setState({
      isLoading: false
    });

    const noBookings = findByTestAttribute(component, 'no-bookings');
    const noBookingsComp = noBookings.dive();
    const noBookingText = findByTestAttribute(noBookingsComp, 'noBookingsTest');

    expect(noBookingText).toHaveLength(1);
  });

  it('Should Display Card', () => {
    const component = setUp(mainState);
    component.setState({
      isLoading: false
    });
    component.setProps({
      getPendingBookings: jest.fn(),
      approveBooking: jest.fn(),
      rejectBooking: jest.fn(),
      bookings: {
        data: [
          {
            id: 1,
            name: 'hello',
            accommodation: {
              name: 'My Accommodation'
            },
            user: {
              username: 'Test'
            }
          }
        ]
      },
      status: 'success'
    })
    const showBookings = findByTestAttribute(component, 'show-bookings');
    const bookingsCard = findByTestAttribute(showBookings.dive(), 'booking-card');
    expect(bookingsCard).toHaveLength(1);

    const dispatchAprove = component.instance().actionSwitch('approve', 1);
    const dispatcReject = component.instance().actionSwitch('reject', 1);
  });



});
