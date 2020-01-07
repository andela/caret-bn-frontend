import bookmarksReducer from '../../reducers/bookmarksReducer';
import {
  GET_BOOKMARKS, GET_BOOKMARKS_ERROR, BOOKMARK_ACCOMMODATION_ERROR, BOOKMARK_ACCOMMODATION
} from "../../actions/types";

describe('Bookmark reducer test ', () => {

  it('Should return default state for bookings', () => {
    const inistialState = bookmarksReducer(undefined, {});
    expect(inistialState).toEqual({
      data: null,
      dataError: null,
      status: '',
      bookmarkStatus: '',
    });
  });

  it('Should handle GET_BOOKMARKS ', () => {
    const successAction = {
      type: GET_BOOKMARKS,
      payload: {
        message: 'Your bookmarks'
      }
    }
    const returnedSate = bookmarksReducer(undefined, successAction);
    expect(returnedSate).toEqual({
      data: {
        message: 'Your bookmarks'
      },
      dataError: null,
      status: 'success',
      bookmarkStatus: '',
    });
  });

  it('Should handle GET_BOOKMARKS_ERROR ', () => {
    const successAction = {
      type: GET_BOOKMARKS_ERROR,
      payload: {
        message: 'No bookmarks'
      }
    }
    const returnedSate = bookmarksReducer(undefined, successAction);
    expect(returnedSate).toEqual({
      data: null,
      dataError: {
        message: 'No bookmarks'
      },
      status: 'error',
      bookmarkStatus: '',
    });
  });

  it('Should handle BOOKMARK_ACCOMMODATION ', () => {
    const successAction = {
      type: BOOKMARK_ACCOMMODATION,
      payload: {
        message: 'Successfully added bookmark'
      }
    }
    const returnedSate = bookmarksReducer(undefined, successAction);
    expect(returnedSate).toEqual({
      data: {
        message: 'Successfully added bookmark'
      },
      dataError: null,
      status: "",
      bookmarkStatus: 'success',
    });
  });

  it('Should handle BOOKMARK_ACCOMMODATION_ERROR ', () => {
    const successAction = {
      type: BOOKMARK_ACCOMMODATION_ERROR,
      payload: {
        message: 'Something went wrong'
      }
    }
    const returnedSate = bookmarksReducer(undefined, successAction);
    expect(returnedSate).toEqual({
      data: null,
      dataError: {
        message: 'Something went wrong'
      },
      status: '',
      bookmarkStatus: 'error',
    });
  });

}); 