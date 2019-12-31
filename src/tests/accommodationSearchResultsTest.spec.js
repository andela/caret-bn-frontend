import React from 'react';
import { shallow, mount } from 'enzyme';
import SearchResults from '../views/accommodations/SearchResults';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import findByTestAttr from './../utilities/tests/findByTestAttribute';
import mockStore from '../utilities/tests/mockStore';
import { MemoryRouter } from 'react-router-dom'

const initialState = {}

const setUp = (initialState = {}, props) => {
  const store = mockStore(initialState);
  const wrapper = shallow(
    <MemoryRouter>
      <SearchResults.WrappedComponent store={store} {...props} />
    </MemoryRouter>
  ).childAt(0).dive();
  return wrapper;
};

describe('Search Results Suite', () => {
  it('should show loading page when isLoading is true', () => {
    const component = setUp(initialState, {
    });
    const loadingPage = findByTestAttr(component, 'loading-page');
    expect(loadingPage.length).toEqual(1);
  });


  it('should show error', async () => {
    const component = setUp(initialState, {});

    await component.setState({
      isLoading: false
    });

    component.setProps({
      status: 'error',
      searchError: {
        message: 'Test Error'
      }
    });

    const tag = findByTestAttr(component.childAt(0).dive(), 'error-message');

    expect(tag.length).toBe(1);
  });

  it('should show Accommodations', async () => {
    const component = setUp(initialState, {});

    component.setState({
      isLoading: false,
      userId: 2,
    });

    component.setProps({
      status: 'success',
      accommodationSearch: jest.fn(),
      location: {
        state: [
          {
            name: 'my house',
            locationId: 2
          }
        ]
      },
      accommodations: {
        data: [
          {
            images: 'http://myimages.com/',
            ratings: [],
            accommodationLocation: {
              name: 'My Place'
            },
            owner: 2,
          }
        ]
      }
    });
    component.instance().componentDidMount();
    const accommodationDisplay = findByTestAttr(component.childAt(0).dive(), 'accommodation-component');
    expect(accommodationDisplay.length).toBe(1);
  });
});
