import React from 'react';
import { shallow } from 'enzyme';
import { Booking, mapStateToProps } from '../components/pages/Boooking';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import Breadcrumbs from '../components/global/Breadcrumbs';
import axios from 'axios';
import findByTestAttribute from '../utilities/tests/findByTestAttribute';
const middlewares = [thunk];

const mainState = {
  bookings: {
    data: null,
    dataError: null,
    booked: null,
    bookedError: null,
    status: '',
  },
};

const props = {
  props: {
    bookings: {
      data: null,
      dataError: null,
      booked: null,
      bookedError: null,
      status: '',
    },
    BookAccommodation: jest.fn(),
    setTimeout: jest.fn()
  }
}
jest.mock('axios');

const testStore = state => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<Booking {...props} />);
  wrapper.setState({ isLoading: false });
  return wrapper;
};

describe('Make booking Test Suite', () => {
  it('Should Mount Successfully', () => {
    const component = setUp(mainState);
    const bookingPage = findByTestAttribute(component, 'booking-page');
    component.setProps({
      accommodation: {
        id: 1
      },
      BookAccommodation: jest.fn(),
      bookings: {
        data: [
          {
            accommodation: {
              id: 1
            }
          }
        ]
      }
    })
    expect(bookingPage).toHaveLength(1);
  });


  it('Should handle submit', () => {
    axios.patch.mockResolvedValue({
      msd: 'my message',
      data: {}
    });
    const component = setUp(mainState);
    component.setState({
      isLoading: true,
      checkInDate: 'today',
      checkOutDate: 'tomorrow',
      roomsNumber: 5
    });
    component.setProps({
      accommodation: {
        id: 1
      },
      BookAccommodation: jest.fn(),
    })
    const handleSubmitSpy = jest.spyOn(component.instance(), 'handleSubmit');
    const roomsNumber = { target: { name: 'roomsNumber', value: '21' } };

    component.find('[data-test="rooms"]').simulate('change', roomsNumber);
    component.find('[data-test="make-booking"]').simulate('click');
    component.find('form').simulate('submit', {
      preventDefault() { },
      setTimeout() { }
    });
    expect(handleSubmitSpy).toBeCalled();
  });

  it('Should handle checkin date Successfully', () => {
    const date = '2019-06-15';
    const component = setUp(mainState);
    const checkinInput = findByTestAttribute(component, 'CheckIn');
    checkinInput.prop('onDayChange')(new Date(date));
    component.find('form').simulate('submit', {
      preventDefault() { },
      setTimeout() { }
    });
    expect(component.state().checkInDate).toEqual(date);
  });

  it('Should handle checkout Successfully', () => {
    const date = '2019-06-15';
    const component = setUp(mainState);
    const checkoutInput = findByTestAttribute(component, 'Checkout');
    checkoutInput.prop('onDayChange')(new Date(date));
    component.find('form').simulate('submit', {
      preventDefault() { },
      setTimeout() { }
    });
    expect(component.state().checkOutDate).toEqual(date);
  });

});
