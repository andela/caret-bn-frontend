import React from 'react';
import { shallow} from 'enzyme';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import DeactivatedListItem from '../../components/pages/accommodations/DeactivatedListItem';
import mockStore from '../../utilities/tests/mockStore';
import findByTestAttribute from './../../utilities/tests/findByTestAttribute';
import { ExpansionPanelActions } from '@material-ui/core';
import DeactivatedListItem from '../../components/pages/accommodations/DeactivatedListItem';
import mockStore from '../../utilities/tests/mockStore';
import findByTestAttribute from './../../utilities/tests/findByTestAttribute';

const props = {
  post: {
    id: 1,
    images: 'https://ericoimg.com',
    name: 'Mock Property',
    availableSpace: 100,
    cost: 3000,
    averageRating: 3,
    ratings: [
      { id: 1, }
    ],
    hasLiked: true,
    hasUnliked: true,
    description: 'description',
    accommodationLocation: {
      name: 'kigali'
    },
    slug: 'kigali',
    owner: 3
  },

  post1: {
    id: 1,
    images: 'https://ericoimg.com',
    name: 'Mock Property',
    availableSpace: 100,
    cost: 3000,
    averageRating: 3,
    ratings: [
      { id: 1, }
    ],
    hasLiked: false,
    hasUnliked: false,
    description: 'description',
    accommodationLocation: {
      name: 'kigali'
    },
    slug: 'kigali',
    owner: 3
  },
  userId: 3,
  handleLike: jest.fn(),
  handleDislike: jest.fn()
}

const setUp = (initialState = {}) => {
  const store = mockStore(initialState);
  const wrapper = shallow(<DeactivatedListItem store={store} post={props.post} userId={props.userId} handleLike={props.handleLike} handleDislike={props.handleDislike} />);
 
  return wrapper;
};

const setUp1 = (initialState = {}) => {
  const store = mockStore(initialState);
  const wrapper = shallow(<DeactivatedListItem store={store} post={props.post1} userId={props.userId} handleLike={props.handleLike} handleDislike={props.handleDislike} />);
 
  return wrapper;
};

describe('Test AccommodationItem', () => {
  it('should mount ThumbUpAltIcon', () => {
    const component = setUp({});
     expect(component.find(ThumbUpAltIcon));
  });
});

describe('Test AccommodationItem', () => {
  it('should mount ThumbUpOutlinedIcon', () => {
    const component = setUp1({});
     expect(component.find(ThumbUpOutlinedIcon));
    });
  it('should mount and render accommodationItem Correctly', () => {
    const component = setUp({});
    const likeButton = findByTestAttribute(component, 'like-button');
    const disLikeButton = findByTestAttribute(component, 'dislike-button');
    likeButton.simulate('click');
    disLikeButton.simulate('click');
    expect(props.handleLike).toBeCalled();
  });
});