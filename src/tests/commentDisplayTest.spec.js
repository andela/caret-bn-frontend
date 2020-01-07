import React from 'react';
import { shallow } from 'enzyme';
import { CommentDisplay, mapStateToProps } from '../components/pages/requests/CommentDisplay';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const middlewares = [thunk];

const mainState = {
    requestComment: {
      commentData: {},
      commentError: {},
      data: {},
      dataError: {},
      status: 'status'
    },
    state: {
      comment: ''
    }
  }

  const props = {
    props: {
      CommentDisplay: {
        commentData: null,
        commentError: null,
        data: null,
        dataError: null,
        status: '',
      }
    },
    state: {
      comment: ''
    },
    history: {
  
    },
    setComment: jest.fn(),
    singleRequestAction: jest.fn(),
    getComment: jest.fn(),
    singleRequestAction: jest.fn(),
    requestId: jest.fn(),
  }
  const testStore = (state) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    return createStoreWithMiddleware(rootReducer, state);
  };

  const setUp = (initialState =  {}) => {
    const store = testStore(initialState);
    const wrapper = shallow(
        <CommentDisplay {...props} store={store} />
    );
      return wrapper;
  } 
  describe('comment Display Test Suite', () => { 
    it('Should Mount Successfully', () => {
      const component = setUp(mainState); 
      const handleSubmitSpy = jest.spyOn(component.instance(), 'handleSubmit');
      component.find('[data-test="comment-view"]').simulate('click');
      const comment = { target: { name: 'comment', value: 'johndoe@gmail.com' } };
      component.find('[data-test="comment"]').simulate('change', comment);
       component.find('form').simulate('submit'); 
       component.instance().handleSubmit();
    });

    it('Should return initial data', () => {
      const initialState = {
        requestComment: {
            data: null,
            dataError: null,
            commentData: null,
            commentError: null,
            status: '',
            comment: ''
          },
        profile: {
          data: {
            profile: null
          },
        }
      };
      expect(mapStateToProps(initialState).data).toEqual(null);
    });
  });