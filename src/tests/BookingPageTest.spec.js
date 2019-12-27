import React from 'react';
import { shallow} from 'enzyme';
import { Booking, mapStateToProps } from '../components/pages/Boooking';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import Breadcrumbs from '../components/global/Breadcrumbs';
import axios from 'axios';

const middlewares = [thunk];

const mainState = {
  bookings:{
    data: null,
    dataError: null,
    booked: null,
    bookedError: null,
    status: '',
},
};

const props = {
  props: {
    bookings:{
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
  const wrapper = shallow(<Booking {...props}/>);
  wrapper.setState({ isLoading: false });
  return wrapper;
};

describe('Make booking Test Suite', () => {
it('Should Mount Successfully', () => {
  const component = setUp(mainState); 
  const date = component.find('DayPickerInput')
  date.at(0).prop('onDayChange')(Date.now())
  date.at(1).prop('onDayChange')(Date.now())
  component.find('[data-test="make-booking"]').simulate('click');
  component.find('form').simulate('submit', {
    preventDefault() {},
    setTimeout() {}
  });
  expect(component.find('h3')).toHaveLength(1);
});


it('Should Mount Successfully', () => {
  axios.patch.mockResolvedValue({
    msd: 'my message',
    data: {}
  });
  const component = setUp(mainState); 
  const handleSubmitSpy = jest.spyOn(component.instance(), 'handleSubmit');
  const roomsNumber = { target: { name: 'roomsNumber', value: '21' } };
  
  component.find('[data-test="rooms"]').simulate('change',roomsNumber );
  component.find('[data-test="make-booking"]').simulate('click');
  component.find('form').simulate('submit', {
    preventDefault() {},
    setTimeout() {}
  });
  expect(component.find('h3')).toHaveLength(1);
});


it('Should Mount Successfully', () => {
  const component = setUp(mainState); 
  const handleSubmitSpy = jest.spyOn(component.instance(), 'handleCheckOut');
  const checkOutDate = { target: { name: 'checkOutDate', value: '2019-12-25' } };
  
  component.find('[data-test="checkout Input"]').simulate('change', checkOutDate);
  component.find('[data-test="make-booking"]').simulate('click');
  component.find('form').simulate('submit', {
    preventDefault() {},
    setTimeout() {}
  });
  expect(component.find('h3')).toHaveLength(1);
});

it('Should update state', () => {
  const component = setUp(mainState); 
  component.setProps({ booked: null, bookedError: null,})
  expect(component.find('h3')).toHaveLength(1);
});
});
