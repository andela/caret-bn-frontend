import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { Form } from "react-bootstrap";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import CreateAccommodation, { CreateAccommodation as AccommodationComponent } from '../../components/pages/CreateAccommodation';
const mockStore = configureStore([thunk]);
jest.mock('axios');

const makeWrapper = () => {
  const state = mockStore({
    accommodation: {
      accommodationData: {data:{slug:'unserious'}},
      accommodationError: null,
      status: "Success"
    },
    locations: {
      data: { data: [{id: 1, name:'location 1'}] },
      dataError: null,
      status: 'Success'
    }
  });
  return  mount(
    <Provider store={state}>
      <Router>
        <CreateAccommodation history={{push: {}}}/>
      </Router>
    </Provider>
  );
}
describe('Create accommodation Test Suite', () => {
  let wrapper;

    it('Should check if form handling clicked', () => {
      wrapper = makeWrapper();
        const input = wrapper.find(Form);
        axios.post.mockImplementationOnce(() => Promise.resolve({data:{
          status: 201
        }}));
        const input2 = wrapper.find('input[name="selectedFile"]');
        input2.simulate('change', {target: {name: 'selectedFile', files: [{File: {}}]}});
        input.simulate('submit');
        expect(wrapper).toMatchSnapshot();
    });

    it('Should handle change when image is selected', () => {
      wrapper = makeWrapper();
        const input = wrapper.find('input[name="selectedFile"]');
        input.simulate('change');
        expect(wrapper).toMatchSnapshot();
    });

    it('Should handle change when input data changed', () => {
        const input = makeWrapper().find('input[name="name"]');
        input.simulate('change', {target:{name: 'name', value: 'acc1oooo'}});
        expect(wrapper).toMatchSnapshot();
    });

});    