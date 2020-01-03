import React from 'react';
import { shallow, mount } from 'enzyme';
import { AllAccommodation, mapStateToProps } from '../components/pages/AllAccommodation';
import SearchBar from '../components/pages/accommodations/SearchBar';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import Breadcrumbs from '../components/global/Breadcrumbs';
import findByTestAttribute from './../utilities/tests/findByTestAttribute';

const middlewares = [thunk];

const accommodationsData = [
  {
    id: 1,
    name: "Isimbi Hotel",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    availableSpace: 19,
    cost: 100,
    currency: "USD",
    highlights: "Lorem Ipsum",
    amenities: "Lorem Ipsum",
    images: "http://res.cloudinary.com/ddypcld8o/image/upload/v1576174843/beyud6wxuuk9id4dggoh.jpg",
    slug: "isimbi-hotel",
    isActivated: true,
    createdAt: "2019-11-14",
    updatedAt: "2019-12-23",
    ownerUser: {
      id: 4,
      email: "user@caretbn.com",
      phone: "1234567890"
    },
    accommodationLocation: {
      id: 1,
      name: "Kigali Office"
    },
    hasRated: true,
    hasBookmarked: true,
    averageRating: 4,
    ratings: [
      {
        id: 1,
        accommodationId: 1,
        userId: 3,
        rating: 4,
        feedback: "Awesome",
        createdAt: "2019-11-15T11:10:43.489Z",
        updatedAt: "2019-11-15T11:10:43.489Z"
      }
    ],
    Likes: 1,
    Unlikes: 1,
    hasLiked: false,
    hasUnliked: false

  }
];

const mainState = {
  accommodation: {
    accommodationData: null,
    accommodationError: null,
    status: '',
    getAccommodation: [],
    getAccommodationError: {},
    singleAccommodation: {},
    singleAccommodationError: {},
  }
}

const props = {
  accommodations: accommodationsData,
  GetAllAccommodation: jest.fn(),
  accommodationSearch: jest.fn(),
  stopLoader: jest.fn()
}

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
    <AllAccommodation  {...props} store={store} />
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

    const likeBtn = findByTestAttribute(component, 'like-button');
    const dislikeBtn = findByTestAttribute(component, 'dislike-button');

    const likeSpy = jest.spyOn(component.instance(), 'handleLike');
    const dislikeSpy = jest.spyOn(component.instance(), 'handleDislike');

    await likeBtn.simulate('click');
    expect(likeSpy).toHaveBeenCalled();

    await dislikeBtn.simulate('click');
    expect(dislikeSpy).toHaveBeenCalled();
  });
});

describe('Modal Tests', () => {
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

  it('should call submit', () => {
    const component = searchSetup(mainState);
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