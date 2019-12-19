import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { Form } from "react-bootstrap";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import sinon from "sinon";
import ViewUsers from '../../components/pages/admin/ViewUsers';
const mockStore = configureStore([thunk]);
jest.mock('axios');

const makeWrapper = () => {
  const state = mockStore({
    user: {
      allUserData: {data:[{id:1, username: 'user1', Role:{name: 'supplier'}}]},
      allUserError: null,
      status: "Success"
    }
  });
  return  mount(
    <Provider store={state}>
      <Router>
        <ViewUsers />
      </Router>
    </Provider>
  );
}
describe('View all users Test Suite', () => {
  it('Should display the user card', () => {
    let wrapper = makeWrapper();
    expect(wrapper.find('.card-header').first().text()).toBe('user1');
});

  it('should fetch all users' , () => {
    const spying = sinon.spy(axios, 'get');
    axios.get.mockResolvedValue([{id:1, username: 'user1'}]);
    expect(spying.calledOnce);
  });

});    