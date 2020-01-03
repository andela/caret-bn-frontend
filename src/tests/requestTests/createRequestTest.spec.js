import CreateRequests from './../../views/requests/CreateRequests';
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import mockStore from '../../utilities/tests/mockStore';
import findByTestAttribute from './../../utilities/tests/findByTestAttribute';
import { oneWayRequest, returnRequest, validProps, multiCityRequest } from '../mocks/createRequestMocks'
const initialState = {}

const setUp = (initialState = {}, props) => {
  const store = mockStore(initialState);
  const wrapper = shallow(<CreateRequests store={store} {...props} />).childAt(0).dive();
  return wrapper;
};

describe('Test Request Component', () => {

  it('Should send one way request and place request', async () => {
    const component = setUp(initialState, {
      addDestination: jest.fn()
    });

    component.setProps(validProps);
    const placeRequestSpy = jest.spyOn(component.instance(), 'placeRequest');

    const type = { target: { value: '1' } };
    const location = { target: { name: 'locationId', value: '1' } };
    const rtrn = { target: { value: '25-12-2019' } };

    const departure = { target: { value: '10-12-2019' } };

    findByTestAttribute(component, 'type-id').simulate('change', type);
    findByTestAttribute(component, 'location-id').simulate('change', location);
    findByTestAttribute(component, 'return-date').simulate('change', rtrn);
    findByTestAttribute(component, 'departure-date').simulate('change', departure);

    component.instance().setState(oneWayRequest)
    findByTestAttribute(component, 'add-destination').simulate('click');

    findByTestAttribute(component, 'place-request').simulate('click');
    expect(placeRequestSpy).toBeCalled();
  });

  it('Should Send A One  Way Request', async () => {
    const component = setUp(initialState, {});
    component.instance().setState(returnRequest)
    component.setProps(validProps);
    const addDestinationSpy = jest.spyOn(component.instance(), 'addDestination');

    findByTestAttribute(component, 'add-destination').simulate('click');
    expect(addDestinationSpy).toBeCalled();
  });

  it('should render loading component', () => {
    const requestProps = {
      requestState: {
        dataError: {
          data: {
            error: 'Test error',
            message: 'This is a message error'
          }
        }
      }
    }

    const component = setUp(initialState, {});
    component.instance().setState(returnRequest)
    component.setProps(requestProps)

    expect(findByTestAttribute(component, 'loading-component').length).toBe(1);
  });

  it('Should simulate destination Change', async () => {
    const component = setUp(initialState, {});
    await component.setState({
      request: multiCityRequest.request
    });
    console.log(component.instance());
    component.instance().handleDestinationChange({
      target: {
        name: 'place',
        value: '2',
        getAttribute: jest.fn()
      }
    });
  });

  it('Should display success alert', () => {
    const successData = {
      requestState: {
        status: 'success',
        data: {
          status: '201',
          message: 'Successfully Placed Request',
          data: {
            id: 34,
            departureDate: '2019 - 12 - 18',
            returnDate: '2019 - 12 - 31',
            createdAt: '2019 - 12 - 16',
            type: {
              id: 2,
              name: 'Return'
            },
            status: {
              id: 1,
              name: 'Pending'
            },
            origin: {
              id: 4,
              name: ' Blantyre Office',
              country: 'Malawi'
            },
            destinations: [
              {
                id: 39,
                arrivalDate: 2019 - 12 - 19,
                departureDate: 2019 - 12 - 30,
                reasons: 'Meeting potential comms manager',
                isFinal: true,
                location: {
                  id: 2,
                  name: "Nairobi Office",
                  country: 'Kenya'
                }
              }
            ]
          }
        }
      }
    }
    const component = setUp(initialState, {});
    component.setProps(validProps);
    component.setProps(successData);
    expect(component.instance().props.requestState.status).toBe('success');


  });

  it('Should mark final', () => {
    const component = setUp(initialState, {});
    component.setState(returnRequest);
    component.instance().finalMarking(1);
    expect(component.instance().state.request.destinations[0].isFinal).toBe(true);
    component.instance().removeDestination(0)
    expect(component.instance().state.request.destinations.length).toBe(0);
  });

});
