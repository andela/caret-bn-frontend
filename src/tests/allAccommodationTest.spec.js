import React from 'react';
import { shallow, mount } from 'enzyme';
import { AllAccommodation , mapStateToProps } from '../components/pages/AllAccommodation';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import Breadcrumbs from '../components/global/Breadcrumbs';

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
    hasLiked: true,
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
}

const testStore = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState =  {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
      <AllAccommodation  {...props} store={store} />
  );
    return wrapper;
} 

describe('ViewAllAccommodation Test Suite', () => { 
  it('Should Mount Successfully', () => {
    const component = setUp(mainState);
    const isAuthenticated = jest.fn();
    expect(component.find(Breadcrumbs)).toHaveLength(1);
  });

});
