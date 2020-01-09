import UserProfile from '../components/pages/profiles/UserProfile';
import React from 'react';
import { shallow, mount } from 'enzyme';
import Bookmarks from '../views/Bookmarks';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import findByTestAttribute from './../utilities/tests/findByTestAttribute';

let wrapper;
const middlewares = [thunk];
const mainState = {
  profile: {
    data: {
      profile: {
        username: 'eric',
        gender: 'male',
        phone: '09409339',
        language: 'lingala',
        country: 'rwanda',
        company: 'andela',
        department: 'it',
        image: 'image.png',
        isLoading: false
      }
    },
    GetUserProfile: jest.fn(),
    switchNotifAction: jest.fn(),
    dataError: null,
    status: '',
    history: {

    }
  },
};

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
    <UserProfile  {...mainState} store={store} />
  ).childAt(0).dive();
  return wrapper;
}

describe('User Profile Test Suite', () => {
  
  it('should test gender element', () => {
    const component = setUp(mainState);
    component.setState({
        isLoading: false,
        username: 'eric',
        gender: 'male',
        phone: '09409339',
        language: 'lingala',
        country: 'rwanda',
        company: 'andela',
        department: 'it',
        selectFile: 'image.png',
        isLoading: false,
        emailNotif: false,
        appNotif: false
      });

    component.setProps({
      switchNotifAction: jest.fn(),
      GetUserProfile: jest.fn(),
      data: {
        profile: {
          emailNotif: true,
          appNotif: true
        }
      }
    })

    const handleChangeSpy = jest.spyOn(component.instance(), 'handleChange');

    const emailSwitch = findByTestAttribute(component, 'email-switch');
    const langInput = findByTestAttribute(component, 'language');
    const image = findByTestAttribute(component, 'image');
    const form = findByTestAttribute(component, 'form');
    const editMode = findByTestAttribute(component, 'edit-mode');
    editMode.simulate('click', {
      preventDefault: jest.fn()
    })
    emailSwitch.simulate('change');
    langInput.simulate('change', {target: {name: 'language', value: 'english'}})
    image.simulate('change', {target: {files: ['myfile']}})
    form.simulate('submit', {
      preventDefault: jest.fn()
    });

    component.setState({
      isLoading: false
    });

    const cancelBtn = findByTestAttribute(component, 'cancel');
    cancelBtn.simulate('click', {
      preventDefault: jest.fn()
    });
  
    expect(component.state().language).toEqual('english');
  });
});
