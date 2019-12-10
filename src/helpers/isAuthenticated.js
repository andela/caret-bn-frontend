import jwtDecode from 'jsonwebtoken';
import { getToken } from './authHelper';

const isAuthenticated = () => {
  const token = getToken();
  try {
    const userInfo = jwtDecode.decode(token);
    if (userInfo === null) return false;
    return userInfo;
  } catch (err) {
    return false;
  }
};

export default isAuthenticated;
