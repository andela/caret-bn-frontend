import React from 'react';
import { shallow } from 'enzyme';
import { CommentItem, mapStateToProps } from '../components/pages/requests/CommentItem';
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
    element: {
        id: 133,
        comment: "jkkkkjkjjjkjkjk",
        requestId: 46,
        deleted: false,
        createdAt: "2020-01-07T17:05:40.522Z",
        updatedAt: "2020-01-07T17:05:40.522Z",
        user: {
            id: 8,
            username: "demoManager",
            email: "caretmanager@gmail.com",
            image: "http://res.cloudinary.com/ddypcld8o/image/upload/v1577091275/s7b73e9umbev8ckkhqg9.jpg",
        }
    },
    userInfo: {
        payload: {
            email: 'toto@gmail.com',
        },
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
        <CommentItem {...props} store={store} />
    );
      return wrapper;
  } 
  describe('comment Display Test Suite', () => { 
    it('Should Mount Successfully', () => {
      const component = setUp(mainState); 
      const comment = { target: { name: 'comment', value: 'johndoe@gmail.com' } };
       component.instance().editButton({ target: { comment: {}, id: 1 }, preventDefault: jest.fn()});
       component.instance().sendCommentEdit({  preventDefault: jest.fn()});
       component.instance().dispatchDeleteComment();
       component.instance().closeEditMode({  preventDefault: jest.fn()});
       component.instance().actionSwitch();
       component.instance().handleChange({ target: { comment: {}, id: 1 }, preventDefault: jest.fn()});
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
  