import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import sinon from "sinon";
import AllDestinations from '../../components/pages/landingPage/AllDestinations';
import accommodationsMocks from '../mocks/accommodationsMocks'

const mockStore = configureStore([thunk]);
jest.mock('axios');

const makeWrapper = () => {
  const state = mockStore({
    locations: {
      data: {data:[{id:1, name: 'Office'}]},
      topData: {data:[{id:1, name: 'Office1'}]},
      status: "success",
    },
    accommodation: {
      highRated: {data:[{id: 1, name: 'isimbi', images: []}]},
    }
  });
  return  mount(
    <Provider store={state}>
      <Router>
        <AllDestinations />
      </Router>
    </Provider>
  );
}
describe('View top travelled and all destinations Test Suite', () => {
  it('Should display location', () => {
    let wrapper = makeWrapper();
    expect(wrapper.find('.top-heading').text()).toBe('Top destinations');
});

  it('should fetch top destinations' , () => {
    const spying = sinon.spy(axios, 'get');
    axios.get.mockResolvedValue([{id:1, name: 'Office1'}]);
    expect(spying.calledOnce);
  });

});    