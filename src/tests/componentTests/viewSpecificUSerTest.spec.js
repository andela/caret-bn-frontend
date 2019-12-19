import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { Form } from "react-bootstrap";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import sinon from "sinon";
import ViewSpecificUser, { ViewSpecificUser as ViewOneUser } from '../../components/pages/admin/ViewSpecificUser';
const mockStore = configureStore([thunk]);
jest.mock('axios');

const makeWrapper = () => {
  const state = mockStore({
    user: {
        userData: {data:{id:1, Role:{name:'user'}}},
        userError: null,
        status: "Success"
    },
    role: {
        assignedRoleData: {message: 'you have assigned the role to this user'},
        assignedRoleError: null,
        assignedRoleStatus: 'Success',
        roleStatus: "Success",
        roleError: null,        
        roleData: {data: [{id:1, name:'manager'}]},
    },
    alert: {
      isShown: true,
    }
  });
  return  mount(
    <Provider store={state}>
      <Router>
        <ViewSpecificUser />
      </Router>
    </Provider>
  );
}
describe('View specific user Test Suite', () => {
    it('Should display the user role', () => {
        let wrapper = makeWrapper();
        expect(wrapper.find('.card-title').first().text()).toBe('Role: user');
    });

    it('Should handle change', () => {
        let wrapper = makeWrapper();
        wrapper.find('#select-role').first().simulate('change');
        expect(wrapper).toMatchSnapshot();
    });

    it('Should handle submit', () => {
        const spying = sinon.spy(axios, 'patch');
        axios.patch.mockResolvedValue({message: 'you have assigned the role to this user'});
        let wrapper = makeWrapper();
        wrapper.find(Form).first().simulate('submit');
        expect(spying.calledOnce);
    });

});    