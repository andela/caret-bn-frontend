import jwtDecode from 'jwt-decode';


const storeToken = (token) => {
  localStorage.setItem('token', token);
};

const getToken = () => localStorage.getItem('token');

const decodeToken = () => {
  if (getToken()) {
    return jwtDecode(getToken());
  }
};

const checkSupplier = () => {
  const userInfo = decodeToken();
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
  storeToken, getToken, decodeToken, checkSupplier,
};
