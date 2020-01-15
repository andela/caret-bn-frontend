import socketIOClient from 'socket.io-client';
import store from '../reduxStore';
import { NEW_NOTIFICATION } from '../actions/types';

const initSocketNotif = () => {
  const socket = socketIOClient.connect('https://caret-bn-backend-staging.herokuapp.com/', {
    query: `token=${localStorage.getItem('token')}`,
  });
  socket.on('notification', (notif) => {
    // console.log('<=== New Notification ===>');
    store.dispatch({
      type: NEW_NOTIFICATION,
      payload: notif,
    });
    // const { newNotif } = store.getState().allNotifs;
    // console.log('newNotif ===>', newNotif);
  });
};
export default initSocketNotif;
