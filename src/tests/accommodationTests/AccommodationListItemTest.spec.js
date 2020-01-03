import React from 'react';
import { shallow, mount } from 'enzyme';
import AccommodationListItem from '../../components/pages/accommodations/AccommodationListItem';
import mockStore from '../../utilities/tests/mockStore';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers/index';
import { MemoryRouter } from 'react-router-dom';
import findByTestAttribute from './../../utilities/tests/findByTestAttribute';


const initialState = {
};

const props = {
  post: {
    id: 1,
    images: 'https://myimage.com',
    availableSpace: 30,
    name: 'Mock Property',
    cost: 3000,
    averageRating: 3,
    ratings: [
      { id: 1, }
    ],
    hasLiked: false,
    hasUnliked: false,
    description: 'hahahaha',
    accommodationLocation: {
      name: 'my place'
    },
    slug: 'mock-propery',
    owner: 3
  },
  userId: 3,
  handleLike: jest.fn(),
  handleDislike: jest.fn()
}

const setUp = (initialState = {}) => {
  const store = mockStore(initialState);
  const wrapper = shallow(<AccommodationListItem store={store} post={props.post} userId={props.userId} handleLike={props.handleLike} handleDislike={props.handleDislike} />);
  return wrapper;
};

describe('Test AccommodationItem', () => {
  it('should mount and render accommodationItem Correctly', () => {
    const component = setUp({});
    const likeButton = findByTestAttribute(component, 'like-button');
    const disLikeButton = findByTestAttribute(component, 'dislike-button');
    likeButton.simulate('click');
    disLikeButton.simulate('click');
    expect(props.handleLike).toBeCalled();
  });
});