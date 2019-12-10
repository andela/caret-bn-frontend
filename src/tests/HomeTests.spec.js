import React from 'react';
import Home from './../views/Home';
import mockStore from './../utilities/tests/mockStore';
import { shallow } from 'enzyme';

const setUp = (initialState = {}) => {
    const store = mockStore(initialState);
    const wrapper = shallow(<Home store={store} />).childAt(0).dive();
    return wrapper;
};

describe('Home tests', () => {
    const state = {
        auth: {
            user: null
        }
    }

    const userState = {
        auth: {
            data: {
                name: "Cheza Dzabala",
                username: "Cheza"
            },
        }
    }

    it('should redirect if no state is provided', () => {
        const component = setUp(state);
        expect(component.debug()).toEqual("<Redirect to=\"/login\" />");
    });

    it('should render the page if state is provided', () => {
        const component = setUp(userState);
        expect(component.find('h1').text()).toBe('Welcome to barefoot Nomad');
        expect(component.find('h4').text()).toBe('Cheza Dzabala');
    });
});