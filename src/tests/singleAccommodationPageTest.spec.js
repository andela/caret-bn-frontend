import React from 'react';
import { shallow } from 'enzyme';
import { SingleAccommodation, mapStateToProps } from '../components/pages/SingleAccommodation';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import Breadcrumbs from '../components/global/Breadcrumbs';
import findByTestAttribute from '../utilities/tests/findByTestAttribute'

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
    userId: 1
  },
};

const props = {
  slug: 'Hello',
  GetSingleAccommodation: jest.fn(),
  likeUnlikeAccommodation: jest.fn(),
  getBookings: jest.fn(),
  bookings: {
    data: [
      {
        id: 1
      }
    ]
  },
  accommodation: {
    ratings: [],
    images: [],
    slug: 'isimbi-hotel',
    id: 1
  },
};

const testStore = state => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<SingleAccommodation {...props} store={store} />);
  wrapper.setState({ isLoading: false });
  wrapper.setProps({
    ratings: {
      status: '',
    }
  });
  return wrapper;
};

describe('Make booking Test Suite', () => {
  it('Should Mount Successfully', () => {
    const component = setUp(mainState);
    expect(component.find(Breadcrumbs)).toHaveLength(1);
    component.instance().componentWillUnmount();
  });

  it('Should return initial data', () => {

    const initialState = {

      accommodation: {
        accommodationData: null,
        accommodationError: null,
        status: '',
        getAccommodation: [],
        getAccommodationError: {},
        singleAccommodation: {},
        singleAccommodationError: {},
      },
      bookings: {}
    };
    expect(mapStateToProps(initialState).accommodation).toEqual({});
  });

  it('Should delete', () => {
    const component = setUp(mainState);
    component.setState({
      userId: 1
    });
    component.setProps({
      accommodation: {
        ownerUser: {
          id: 1
        }
      },
      accommodation: {
        id: 1
      },
      status: 'success',
      deleteAccommodation: jest.fn(),
      history: {
        push: jest.fn()
      }
    });
    component.instance().deleteAcc();
    expect(component.state().error.status).toEqual(false);

  });
  it('Should fail delete', () => {
    const component = setUp(mainState);
    component.setState({
      userId: 1
    });
    component.setProps({
      accommodation: {
        ownerUser: {
          id: 1
        }
      },
      accommodation: {
        id: 1
      },
      status: 'fail',
      deleteAccommodation: jest.fn(),
      history: {
        push: jest.fn()
      }
    });

    const likeBtn = findByTestAttribute(component, 'like');
    const dislikebtn = findByTestAttribute(component, 'dislike');

    dislikebtn.simulate('click')
    likeBtn.simulate('click')
    component.instance().deleteAcc();
    expect(component.state().error.status).toEqual(false);
  });
});
