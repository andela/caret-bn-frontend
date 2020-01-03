/* eslint-disable import/no-cycle */
import jwtDecode from 'jsonwebtoken';
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

export const checkHost = () => {
  const userInfo = isAuth();
  if (userInfo) {
    const { payload } = userInfo;
    const { role } = payload;
    if (role !== 5) {
      return false;
    }
    return true;
  }
  return false;
};

export const checkManager = () => {
  const user = isAuth();
  if (user) {
    const { payload } = user;
    const { role } = payload;
    if (role !== 1 && role !== 3 && role !== 5 && role !== 6) {
      return false;
    }
    return true;
  }
  return false;
};

export const checkAdmin = () => {
  const userInfo = isAuth();
  if (userInfo) {
    const { payload } = userInfo;
    const { role } = payload;
    if (role !== 1) {
      return false;
    }
    return true;
  }
  return false;
};


export const checkEmail = () => {
  try {
    const decodedToken = jwtDecode.decode(getToken());
    const { email } = decodedToken.payload;
    return email;
  } catch (err) {
    return false;
  }
};

export default {
  storeToken, getToken, checkSupplier, checkEmail, checkAdmin, checkManager,
};
