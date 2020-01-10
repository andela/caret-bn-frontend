import {
  CHAT_HISTORY, CHAT_HISTORY_ERROR, PRIVATE_CHAT_HISTORY, PRIVATE_CHAT_HISTORY_ERROR,
} from './types';

import { getToken } from '../helpers/authHelper';
import backendCall from '../helpers/backendCall';

const token = getToken();

const chatType = (type, payload) => ({
  type,
  payload,
});

const headers = {
  Authorization: `Bearer ${token}`,
};

export const getChatHistory = () => (dispatch) => new Promise(async (resolve, reject) => {
  try {
    const res = await backendCall.get('/chats', { headers });
    dispatch(chatType(CHAT_HISTORY, res.data));
    resolve();
  } catch (error) {
    dispatch(chatType(CHAT_HISTORY_ERROR, error.response));
    reject();
  }
});

export const getPrivateChatHistory = () => (dispatch) => new Promise(async (resolve, reject) => {
  try {
    const res = await backendCall.get('chats/private', { headers });
    dispatch(chatType(PRIVATE_CHAT_HISTORY, res.data));
    console.log('response........', res.data);
    resolve();
  } catch (error) {
    dispatch(chatType(PRIVATE_CHAT_HISTORY_ERROR, error.response));
    reject();
  }
});
