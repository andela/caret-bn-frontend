import React from 'react';
import { shallow, mount } from 'enzyme';
import Bookmark from '../../components/pages/accommodations/BookMark';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers/index';
import findByTestAttribute from './../../utilities/tests/findByTestAttribute';

const middlewares = [thunk];

const mainState = {};

const props = {};

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
    <Bookmark  {...props} store={store} />
  ).childAt(0).dive();
  return wrapper;
}

describe('Render bookmarks page', () => {
  it('Should star if user has bookmarked', () => {
    const component = setUp(mainState);
    component.setProps({
      bookmarkAccommodation: jest.fn(),
      hasBookmarked: true
    });
    component.setState({
      bookmarking: false
    });
    component.instance().componentDidMount()
    const bookmarked = findByTestAttribute(component, 'bookmarked');
    const processBookmarkSpy = jest.spyOn(component.instance(), 'processBookmark');
    bookmarked.simulate('click');
    expect(processBookmarkSpy).toBeCalled();
  });


  it('Should star outline if user has not bookmarked', () => {
    const component = setUp(mainState);
    component.setProps({
      bookmarkAccommodation: jest.fn(),
      reloadAction: jest.fn(),
      hasBookmarked: true
    });
    component.setState({
      bookmarking: true
    });
    const unbookmarked = findByTestAttribute(component, 'unbookmarked');
    const processBookmarkSpy = jest.spyOn(component.instance(), 'processBookmark');
    unbookmarked.simulate('click')
    expect(processBookmarkSpy).toBeCalled();
  });

  it('Should render close sign', () => {
    const component = setUp(mainState);
    component.setProps({
      bookmarkAccommodation: jest.fn(),
      reloadAction: jest.fn(),
      hasBookmarked: true,
      closeRequired: true,
    });
    component.setState({
      bookmarking: true
    });
    const close = findByTestAttribute(component, 'close');
    const processBookmarkSpy = jest.spyOn(component.instance(), 'processBookmark');
    close.simulate('click')
    expect(processBookmarkSpy).toBeCalled();
  });


}); 