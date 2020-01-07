import {
  GET_BOOKMARKS, GET_BOOKMARKS_ERROR, BOOKMARK_ACCOMMODATION, BOOKMARK_ACCOMMODATION_ERROR,
} from './types';
import { getToken } from '../helpers/authHelper';
import backendCall from '../helpers/backendCall';

const token = getToken();

const bookmarksType = (type, payload) => ({
  type,
  payload,
});

const headers = {
  Authorization: `Bearer ${token}`,
};

export const getBookmarks = () => async (dispatch) => {
  try {
    const response = await backendCall.get('/bookmarks', { headers });
    dispatch(bookmarksType(GET_BOOKMARKS, response.data));
  } catch (error) {
    dispatch(bookmarksType(GET_BOOKMARKS_ERROR, error.response));
  }
};

export const bookmarkAccommodation = (slug) => async (dispatch) => {
  try {
    const response = await backendCall.post(`/accommodations/${slug}/bookmark`, {}, { headers });
    return dispatch(bookmarksType(BOOKMARK_ACCOMMODATION, response.data));
  } catch (error) {
    return dispatch(bookmarksType(BOOKMARK_ACCOMMODATION_ERROR, error.response));
  }
};
