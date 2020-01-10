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
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo3LCJpc1ZlcmlmaWVkIjp0cnVlLCJlbWFpbCI6ImNhcmV0c3VwcGxpZXJAZ21haWwuY29tIiwicm9sZSI6NSwibGluZU1hbmFnZXIiOjh9LCJpYXQiOjE1Nzg1ODQyMTMsImV4cCI6MTU3ODY3MDYxM30.qh_Ac2IAAPt1yBVDSmP8X0HmZgrjJ4we3kabJxxQW1s';
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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo3LCJpc1ZlcmlmaWVkIjp0cnVlLCJlbWFpbCI6ImNhcmV0c3VwcGxpZXJAZ21haWwuY29tIiwicm9sZSI6NSwibGluZU1hbmFnZXIiOjh9LCJpYXQiOjE1Nzg1ODQyMTMsImV4cCI6MTU3ODY3MDYxM30.qh_Ac2IAAPt1yBVDSmP8X0HmZgrjJ4we3kabJxxQW1s';

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
