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


describe('Create accommodation Test Suite', () => {
  let wrapper;

  beforeEach(() => {
    const state = mockStore({
      accommodation: {
        accommodationData: {data:{slug:'unserious'}},
        accommodationError: null,
        status: "Success"
      }
    })
    wrapper = mount(
      <Provider store={state}>
        <Router>
          <CreateAccommodation />
        </Router>
      </Provider>
    );
    console.log(wrapper.html());
  });

//   it('should render the create accommodation page', () => {
//     expect(wrapper).toMatchSnapshot();
//   });

//   it('Should check if form handling clicked', () => {
//     const input = wrapper.find('Form');
//     input.simulate('submit');
//     expect(wrapper).toMatchSnapshot();
//   });

//   it('Should handle change when input data changed', () => {
//     const input = wrapper.find('Form.Control').first();
//     input.simulate('change');
//     expect(wrapper).toMatchSnapshot();
//   });

  it('Should show message based on response status', () => {
    wrapper = shallow(
      <AccommodationComponent />
    );
      // test Success case

    const success = {
      status: 'Success',
      accommodationData: {
        message: 'Successfuly created',
        data: {
          name: 'dummy name',
          slug: 'test-accommodation'
        }
      }
    };
    wrapper.setProps(success);
    expect(wrapper.instance().props.status).toBe('Success');

    // test Failure case

    const failure = {
      status: 'Failure',
      accommodationError: {
        data: {
          message: 'This accommodation already exists!',
        }
      }
    };
    wrapper.setProps(failure);
    expect(wrapper.instance().props.status).toBe('Failure');


    // test Default case
    
    const Default = {
      status: 'Default',
    };
    wrapper.setProps(Default);
    expect(wrapper.instance().props.status).toBe('Default');
  });

  it('should render the create accommodation page', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('Should check if form handling clicked', () => {
        const input = wrapper.find(Form);
        console.log(wrapper.html());
        axios.post.mockImplementationOnce(() => Promise.resolve({data:{
          status: 201
        }}));
        const input2 = wrapper.find('input[name="selectedFile"]');
        input2.simulate('change', {target: {name: 'selectedFile', files: [{File: {}}]}});
        input.simulate('submit');
        expect(wrapper).toMatchSnapshot();
    });

    it('Should handle change when image is selected', () => {
        const input = wrapper.find('input[name="selectedFile"]');
        input.simulate('change');
        expect(wrapper).toMatchSnapshot();
    });

    it('Should handle change when input data changed', () => {
        const input = wrapper.find('input[name="name"]');
        input.simulate('change', {target:{name: 'name', value: 'acc1oooo'}});
        expect(wrapper).toMatchSnapshot();
    });
});    