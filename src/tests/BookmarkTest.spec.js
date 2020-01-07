import React from 'react';
import { shallow, mount } from 'enzyme';
import Bookmarks from '../views/Bookmarks';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import findByTestAttribute from './../utilities/tests/findByTestAttribute';
import { bookmarks } from './mocks/bookmarkMocks';

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
    <Bookmarks  {...props} store={store} />
  ).childAt(0).dive();
  return wrapper;
}

describe('Render bookmarks page', () => {
  it('Should render bookmarks page Successfully', () => {
    const component = setUp(mainState);
    component.setProps({
      getBookmarks: jest.fn()
    });
    const loader = findByTestAttribute(component, 'isLoading').dive();
    expect(loader).toHaveLength(1);
  });

  it('Should render bookmarks Successfully', () => {
    const component = setUp(mainState);
    component.setState({
      isLoading: false
    });
    component.setProps({
      bookmarks: bookmarks,
      getBookmarks: jest.fn()
    });
    const showBookmarks = findByTestAttribute(component, 'show-bookmarks').dive();
    const bookmarkContainer = findByTestAttribute(showBookmarks, 'bookmark-container');
    expect(bookmarkContainer).toHaveLength(1);
  });


  it('Should render loader page Successfully', async () => {
    const component = setUp(mainState);
    component.setState({
      isLoading: false
    });
    component.setProps({
      bookmarks: {},
      getBookmarks: jest.fn()
    });
    await component.instance().componentDidMount();
    const showBookmarks = findByTestAttribute(component, 'show-bookmarks').dive();
    const loaderContainer = findByTestAttribute(showBookmarks, 'loader-container');
    expect(loaderContainer).toHaveLength(1);
  });

});
