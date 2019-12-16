/* eslint-disable import/no-cycle */
import isAuth from './isAuthenticated';

export const storeToken = (token) => localStorage.setItem('token', token);

export const getToken = () => localStorage.getItem('token');

export const checkSupplier = () => {
  const userInfo = isAuth();
  if (userInfo) {
    const { payload } = userInfo;
    const { role } = payload;
    if (role !== 5 && role !== 2) {
      return false;
    }
    return true;
  }
  return false;
};

export default {
  storeToken, getToken, checkSupplier,
};
