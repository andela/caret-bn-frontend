import React from 'react';
import { shallow, mount } from 'enzyme';
import {  DeactivatedAccommodation , mapStateToProps } from '../components/pages/DeactivatedAccommodation';
import SearchBar from '../components/pages/accommodations/SearchBar';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import Breadcrumbs from '../components/global/Breadcrumbs';
import findByTestAttribute from './../utilities/tests/findByTestAttribute';

const middlewares = [thunk];

const accommodationDeactivatedData = {
    message: "All Deactivated accommodations are retrieved successfully!",
    data: [
        {
    id: 36,
    name: "Patrick Lodges ",
    description: "Patrick Lodges is a modern, elegant 4-star hotel overlooking the sea, perfect for a romantic, charming vacation,",
    availableSpace: 135,
    cost: 2000,
    currency: "USD",
    highlights: "This is my hotel",
    amenities: "hjdhdhd↵ddhhd↵'dhdhdhd",
    images: "http://res.cloudinary.com/ddypcld8o/image/upload/v1578239868/xv1ujz7h8arasd2neeps.jpg",
    slug: "patrick-lodge",
    isActivated: false,
    createdAt: "2019-12-14",
    updatedAt: "2020-01-07",
    ownerUser: {id: 7, email: "caretsupplier@gmail.com", phone: null},
    accommodationLocation: {id: 3, name: "Kampala Office"},
    hasRated: false,
    hasBookmarked: false,
    averageRating: 1,
    Likes: 1,
    Unlikes: 0,
    hasLiked: false,
    hasUnliked: false
        }
    ]
}

const mainState = {
  accommodation: {
    accommodationData: null,
    accommodationError: null,
    status: '',
    getAccommodation: [],
    getAccommodationError: {},
    singleAccommodation: {},
    singleAccommodationError: {},
    accommodationDeactivatedError: {},
    accommodationDeactivatedData: {},
  }
}

const props = {
  accommodations: accommodationDeactivatedData,
  GetAllAccommodation: jest.fn(),
  getDeactivatedAccommodation: jest.fn(),
  accommodationSearch: jest.fn(),
  startSearch: jest.fn(),
  stopLoader: jest.fn(),
  accommodationDeactivatedData
}

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
    <DeactivatedAccommodation {...props} store={store} />
  );
  return wrapper;
}

const searchSetup = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
    <SearchBar {...props} store={store} />
  ).childAt(0).dive();
  return wrapper
}

describe('ViewAllAccommodation Test Suite', () => {
  it('Should Mount Successfully', () => {
    const component = setUp(mainState);
    const isAuthenticated = jest.fn();
    expect(component.find(Breadcrumbs)).toHaveLength(1);
  });
});

describe('Like Dislike tests', () => {
  it('should like and deslike', async () => {
    const component = setUp(mainState);
    component.setState({
      isLoading: false
    });
    component.setProps({
      likeUnlikeAccommodation: jest.fn(),
      getDeactivatedAccommodation: jest.fn(),
    })
    const likeSpy = jest.spyOn(component.instance(), 'handleLike');
    const dislikeSpy = jest.spyOn(component.instance(), 'handleDislike');
    component.instance().handleLike('isimbi');
    component.instance().handleDislike('isimbi');
    expect(likeSpy).toHaveBeenCalled();
    expect(dislikeSpy).toHaveBeenCalled();
  });
});

describe('Modal Tests', () => {
  it('should start search', () => {
    const component = setUp(mainState);
    component.setState({
      showSearch: false
    });
    component.instance().showSearch();
    expect(component.instance().state.showSearch).toBe(true);
  });

  it('should stop loader', () => {
    const component = setUp(mainState);
    component.setState({
      isLoading: true
    });
    component.instance().stopLoader();
    expect(component.instance().state.isLoading).toBe(false);
  });

  it('should end search', () => {
    const component = setUp(mainState);
    component.setState({
      isSearching: true,
    });

    component.instance().endSearch();

    expect(component.instance().state.isSearching).toBe(false);
  });

  it('should start search', () => {
    const component = setUp(mainState);
    component.setState({
      isLoading: false,
      isSearching: false,
    });
    component.instance().startSearch();
    expect(component.instance().state.isLoading).toBe(true);
    expect(component.instance().state.isSearching).toBe(true);
  });

  it('should call handleChange', () => {
    const component = searchSetup(mainState);
    component.setState({
      showSearch: true
    });
    const handleChangeSpy = jest.spyOn(component.instance(), 'handleChange');
    const amenities = findByTestAttribute(component, 'amenities');
    amenities.simulate('change', { target: { name: 'amenities', value: 'test amenities' } })
    expect(handleChangeSpy).toHaveBeenCalled();
  });

  it('should call submit', async () => {
    const component = searchSetup(mainState);
    component.setProps({
      startSearch: jest.fn(),
      accommodationSearch: jest.fn(),
      stopLoader: jest.fn()
    });
    const submitSearchSpy = jest.spyOn(component.instance(), 'submitSearch');
    const submitButton = findByTestAttribute(component, 'submit-button');
    submitButton.simulate('click')
    expect(submitSearchSpy).toHaveBeenCalled();
  });

  it('should call submit', async () => {
    const component = searchSetup(mainState);
    const submitSearchSpy = jest.spyOn(component.instance(), 'submitSearch');
    const amenities = findByTestAttribute(component, 'amenities');
    const description = findByTestAttribute(component, 'description');
    const highlights = findByTestAttribute(component, 'highlights');
    const name = findByTestAttribute(component, 'name');
    const rating = findByTestAttribute(component, 'rating');
    const submitButton = findByTestAttribute(component, 'submit-button');
    amenities.simulate('change', { target: { name: 'amenities', value: 'test amenities' } })
    description.simulate('change', { target: { name: 'description', value: 'My Desc' } })
    highlights.simulate('change', { target: { name: 'highlights', value: 'test highlights' } })
    rating.simulate('change', { target: { name: 'rating', value: 'Rating' } })
    name.simulate('change', { target: { name: 'name', value: 'name' } })
    await submitButton.simulate('click')
    expect(submitSearchSpy).toHaveBeenCalled();
  });
});
