import React from 'react';
import { shallow } from 'enzyme';
import { SingleAccommodation } from '../components/pages/SingleAccommodation';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import findByTestAttribute from '../utilities/tests/findByTestAttribute';

const middlewares = [thunk];

const mainState = {
  accommodation: {
    accommodationData: null,
    accommodationError: null,
    status: '',
    getAccommodation: [],
    getAccommodationError: {},
    singleAccommodation: {},
    singleAccommodationError: {},
    isLoading: false,
    ratings: {
      rating: 0,
      feedback: '',
    },
  },
};

const props = {
  slug: 'Hello',
  GetSingleAccommodation: jest.fn(),
  accommodation: {
    id: 1,
    ratings: [],
    images: [],
    slug: 'isimbi-hotel',
  },
  bookings: {
    data: {
      id: 1
    }
  },
  rateAccommodation: jest.fn(),
  likeUnlikeAccommodation: jest.fn(),
};


const testStore = state => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<SingleAccommodation {...props} store={store} />);
  wrapper.setState({ isLoading: false, hasBooked: true });
  wrapper.setProps({
    ratings: {
      status: '',
    }
  });
  return wrapper;
};

describe('Testing Modal', () => {
  it('Should Call Submit Successfully', async () => {
    const component = setUp(mainState);
    const modal = findByTestAttribute(component, 'rate-acc-btn');
    const submitSpy = jest.spyOn(component.instance(), 'submitRating');
    const rateButton = findByTestAttribute(modal.dive().dive(), 'rate-button')
    const submitButton = findByTestAttribute(modal.dive().dive(), 'submit-button')
    const rateField = findByTestAttribute(modal.dive().dive(), 'rating')
    const feedbackField = findByTestAttribute(modal.dive().dive(), 'feedback')

    await rateButton.simulate('click');
    await feedbackField.simulate('change', { target: { name: 'feedback', value: 'This is my value' } })
    await rateField.simulate('change', { target: { name: 'rating', value: '4' } })
    await submitButton.simulate('click');

    component.instance().submitRating({
      preventDefault: jest.fn()
    }, jest.fn())

    expect(submitSpy).toBeCalled();
  });

  it('Should show alert', async () => {
    const component = setUp(mainState);
    const modal = findByTestAttribute(component, 'rate-acc-btn');
    const submitSpy = jest.spyOn(component.instance(), 'submitRating');
    const rateButton = findByTestAttribute(modal.dive().dive(), 'rate-button')
    const submitButton = findByTestAttribute(modal.dive().dive(), 'submit-button')
    const rateField = findByTestAttribute(modal.dive().dive(), 'rating')
    const feedbackField = findByTestAttribute(modal.dive().dive(), 'feedback')

    await rateButton.simulate('click');
    await feedbackField.simulate('change', { target: { name: 'feedback', value: '' } });
    await rateField.simulate('change', { target: { name: 'rating', value: '2' } });

    component.instance().submitRating({
      preventDefault: jest.fn()
    }, jest.fn())

    expect(submitSpy).toBeCalled();
  });

  it('Should handle like & dislike buttons', async () => {
    const component = setUp(mainState);

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
