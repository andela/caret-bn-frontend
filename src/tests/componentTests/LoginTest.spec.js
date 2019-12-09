import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Login, { Login as LoginComponent } from '../../components/pages/Login';
import Input from '../../components/global/Input';
import findByTestAttribute from '../../utilities/tests/findByTestAttribute';

const mockFunc = jest.fn();
const mockStore = configureStore([thunk]);

describe('Login Test Suite', () => {
  let wrapper;
  const defaultProps = {
    userLogin: mockFunc,
    data: {},
    dataError: {},
    history: {},
    status: '',
  };

  beforeEach(() => {
    const state = mockStore({
      auth: {
        data: {},
        dataError: {},
        status: "Success"
      }
    })
    wrapper = mount(
      <Provider store={state}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
  });

  it('should render the Login page', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should check if form handling clicked', () => {
    const input = wrapper.find('form');
    input.simulate('submit');
    expect(wrapper).toMatchSnapshot();
  });

  it('Should handle change when input data changed', () => {
    const input = findByTestAttribute(wrapper, 'email');
    input.at(0).simulate('change');
    expect(wrapper).toMatchSnapshot();
  });

  it('Should show message based on response status', () => {
    wrapper = shallow(
      <LoginComponent />
    );
    // test Success case

    const success = {
      status: 'Success',
      data: {
        message: 'Successfuly login',
        data: {
          token: 'xyz',
        }
      },
      history: {
        push: mockFunc
      }
    };
    wrapper.setProps(success);
    expect(wrapper.instance().props.status).toBe('Success');

    // test Failure case

    const failure = {
      status: 'Failure',
      dataError: {
        data: {
          message: 'Incorrect email or password',
        }
      },
      history: {
        push: mockFunc
      }
    };
    wrapper.setProps(failure);
    expect(wrapper.instance().props.status).toBe('Failure');


    // test Default case

    const Default = {
      status: 'Default',
      history: {
        push: mockFunc
      }
    };
    wrapper.setProps(Default);
    expect(wrapper.instance().props.status).toBe('Default');
  });
});    