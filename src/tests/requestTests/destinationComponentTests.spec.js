import Destination from './../../components/requests/Destination';
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import configureStore from "redux-mock-store";
import mockStore from '../../utilities/tests/mockStore';
import findByTestAttribute from './../../utilities/tests/findByTestAttribute';
const mockFunc = jest.fn();
const confirmRequest = mockFunc;
const cancelDestination = mockFunc;
const removeDestination = mockFunc;
import { allProps } from '../mocks/createRequestMocks';
const initialState = {}

const setUp = (initialState = {}, props) => {
    const store = mockStore(initialState);
    const wrapper = mount(<Destination store={store} {...props} />);
    return wrapper;
};
describe('Test Desitination Component', () => {

    it('should render component', async () => {
        const component = setUp(initialState, allProps);

        const location = { target: { name: 'locationId', value: '1' } };
        const arrival = { target: { name: 'arrivalDate', value: '2020-10-10' } };
        const departure = { target: { name: 'departureDate', value: 'departure' } };
        const booking = { target: { name: 'bookingId', value: 'booking' } };
        const reason = { target: { name: 'reasons', value: 'Hello world' } };
        const finalFlag = { target: { name: 'isFinal', value: 'true' } };

        findByTestAttribute(component, 'location-id').at(0).simulate('change', location)
        findByTestAttribute(component, 'arrivalDate').at(0).simulate('change', arrival)
        findByTestAttribute(component, 'departureDate').at(0).simulate('change', departure)
        findByTestAttribute(component, 'bookingId').at(0).simulate('change', booking)
        findByTestAttribute(component, 'reasons').at(0).simulate('change', reason)
        findByTestAttribute(component, 'remove-destination').at(0).simulate('click')
        expect(allProps.removeDestination).toHaveBeenCalledTimes(1);
    });
});