import React from 'react';
import { shallow } from 'enzyme';
import Home from '../views/Authentication';
import mockStore from '../utilities/tests/mockStore';

const setUp = (initialState = {}) => {
    const store = mockStore(initialState);
    const wrapper = shallow(<Home store={store} {...{match: { params: {token: 'jdjdjdkk'}}}} />).childAt(0).dive();
    return wrapper;
};

describe('Home tests', () => {
    it('should render the redirect if no state is provided', () => {
        const component = setUp();
        const headerComponent = component.find('div.header-component').length;
        expect(headerComponent).toEqual(1);
    });
});
