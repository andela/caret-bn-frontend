import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import SocialButtons from '../components/pages/SocialButtons';
import AuthHolder from '../components/global/AuthHolder';
import findByTestAttribute from '../utilities/tests/findByTestAttribute';

const setUp = (Component) => {
    const wrapper = shallow(Component);
    return wrapper;
};

describe('Authentication Views & Holders', () => {
    it('should Display Social Buttons', () => {
        const component = setUp(<SocialButtons />);
        const buttonFacebook = findByTestAttribute(component, 'facebookButton');
        const googleButton = findByTestAttribute(component, 'googleButton');
        expect(buttonFacebook.length).toBe(1);
        expect(googleButton.length).toBe(1);
    });

    it('Should Display Auth Holder', () => {
        const component = setUp(<AuthHolder />);
        const authHolderDiv = component.find('div.auth-holder').length;
        const lineDiv = component.find('div.line').length;
        const socialAuth = component.find('div.social-auth').length;
        expect(authHolderDiv).toEqual(1);
        expect(lineDiv).toEqual(2);
        expect(socialAuth).toEqual(1);
    });

    it('Should Simulate Events', () => {
        const component = setUp(<SocialButtons />);
        const buttonFacebook = findByTestAttribute(component, 'facebookButton');
        const googleButton = findByTestAttribute(component, 'googleButton');
        sinon.stub(window.location, 'assign');
        sinon.stub(window.location, 'replace');
        buttonFacebook.simulate('click');
        googleButton.simulate('click');
    });

});
