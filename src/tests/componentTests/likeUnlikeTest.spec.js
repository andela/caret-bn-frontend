import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { Form } from "react-bootstrap";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import sinon from "sinon";
import SingleAccommodation, {SingleAccommodation as OneAccommodation} from '../../components/pages/SingleAccommodation';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import * as checkRole from '../../helpers/authHelper';

const mockStore = configureStore([thunk]);
jest.mock('axios');

const makeWrapper = () => {
  const state = mockStore({
    accommodation: {
      singleAccommodation: { data: { id: 1, name: 'isimbi', ownerUser: { id: 7, email: "caretsupplier@gmail.com" }, images: [] } },
      like: { message: 'Liked successfully' },
      dislike: null
    },
    bookings: {
      booked: null,
      bookings: null,
      bookedError: null
    },
    bookmarks: {
      bookmarkStatus: 'success'
    }
  });
  return mount(
    <Provider store={state}>
      <Router>
        <SingleAccommodation  />
      </Router>
    </Provider>
  );
}
describe('Like and dislike Accommodation Test Suite', () => {
  it('Should handle like', () => {
    checkRole.checkHost = jest.fn();
    checkRole.checkHost.mockReturnValue(false);
    const spying = sinon.spy(axios, 'post');
    axios.patch.mockResolvedValue({ message: 'Liked successfully' });
    let wrapper = makeWrapper();
    wrapper.find(OneAccommodation).setState({ isLoading: false });
    wrapper.find('.like-button').first().simulate('click')
    expect(spying.calledOnce);
    axios.post.restore();
  });

  it('Should handle dislike', () => {
    checkRole.checkHost = jest.fn();
    checkRole.checkHost.mockReturnValue(false);
    const spying = sinon.spy(axios, 'post');
    axios.patch.mockResolvedValue({ message: 'disliked successfully' });
    let wrapper = makeWrapper();
    wrapper.find(OneAccommodation).setState({ isLoading: false });
    wrapper.find('.dislike-button').first().simulate('click')
    expect(spying.calledOnce);
    axios.post.restore();
  });
});
