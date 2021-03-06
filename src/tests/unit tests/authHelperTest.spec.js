import jwtDecode from "jwt-decode";
import localStorageMock from "../mocks/localStorageMock";
import authHelper from "../../helpers/authHelper";
import isAuth from '../../helpers/isAuthenticated';

class LocalStorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo3LCJpc1ZlcmlmaWVkIjp0cnVlLCJlbWFpbCI6ImNhcmV0c3VwcGxpZXJAZ21haWwuY29tIiwicm9sZSI6NSwibGluZU1hbmFnZXIiOjh9LCJpYXQiOjE1NzkxODQzMzksImV4cCI6MTU3OTI3MDczOX0.74PlYX1Tflwf6jgcf1bi7l_CSu3LyECgnw_tiZJsy-Y';
      return token;
    }
  
    setItem(key, value) {
      this.store[key] = value.toString();
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  }
  
  Object.defineProperty(window, 'localStorage', { value:  new LocalStorageMock()});
  
  const { getToken, checkSupplier, checkEmail, checkAdmin  } = authHelper;

  describe('Auth Helper Tests', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo3LCJpc1ZlcmlmaWVkIjp0cnVlLCJlbWFpbCI6ImNhcmV0c3VwcGxpZXJAZ21haWwuY29tIiwicm9sZSI6NSwibGluZU1hbmFnZXIiOjh9LCJpYXQiOjE1NzkxODQzMzksImV4cCI6MTU3OTI3MDczOX0.74PlYX1Tflwf6jgcf1bi7l_CSu3LyECgnw_tiZJsy-Y';

      it('Should get the token ', () => {
        expect(getToken()).toEqual(token)
      });

      it('Should check for a supplier role', () => {
        checkSupplier();
      });

      it('Should check for an admin role', () => {
        checkAdmin();
      });
      it('Should check for a checkEmail()', () => {
        checkEmail();
      });
  });
