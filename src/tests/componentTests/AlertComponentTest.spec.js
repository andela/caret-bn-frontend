import AlertComponent from '../../components/global/AlertComponent';
import React from 'react';
import { mount } from 'enzyme';
import mockStore from '../../utilities/tests/mockStore';
import findByTestAttribute from '../../utilities/tests/findByTestAttribute';

const initialState = {}

const setUp = (initialState = {}, props) => {
    const store = mockStore(initialState);
    const wrapper = mount(<AlertComponent store={store} />);
    return wrapper;
};
describe('Test Desitination Component', () => {
    it('should render component', async () => {
        const component = setUp(initialState);
        expect(findByTestAttribute(component, 'data-alert').at(0).length).toBe(1);
    });
});