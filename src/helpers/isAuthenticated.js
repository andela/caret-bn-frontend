import jwtDecode from 'jsonwebtoken';
// eslint-disable-next-line import/no-cycle
import { getToken } from './authHelper';

const isAuthenticated = () => {
  const token = getToken();
  try {
    const userInfo = jwtDecode.verify(token, 'supersecretjwtkey');
    if (userInfo === null) return false;
    return userInfo;
  } catch (err) {
    return false;
  }
};

export default isAuthenticated;
