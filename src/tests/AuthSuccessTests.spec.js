import AuthSuccess from '../views/SocialAuthSuccess';
import { shallow } from 'enzyme';
import React from 'react';
import mockStore from '../utilities/tests/mockStore';

const initialState = {
    auth: {
        status: 'pending',
        dataError: null,
    }
}

const propsUnsaved = {
    location: {
        search: '?user=%7B%22id%22:13,%22username%22:%22Macheza%20Dzabala%22,%22email%22:%22dzabalamacheza@gmail.com%22,%22token%22:%22helooworld%22%7D'
    },
    status: 'pending'
}

const badProps = {
    location: {
        search: '?kdjios9d90w3mksm'
    },
    status: 'failure'
}

const setUp = (initialState = {}, props) => {
    const store = mockStore(initialState);
    const wrapper = shallow(<AuthSuccess store={store} {...props} />).childAt(0).dive();
    return wrapper;
};

describe('Auth Success Component Suite', () => {
    it('should render self and subcomponents', () => {
        const component = setUp(initialState, propsUnsaved);
        expect(component.find('h1').text()).toBe('Logging you in....');
        component.setProps(badProps);
        expect(component.find('h1').text()).toBe('There was a problem loggin you in');
    })


});

