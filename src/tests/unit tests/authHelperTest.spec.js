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
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo3LCJpc1ZlcmlmaWVkIjp0cnVlLCJlbWFpbCI6ImNhcmV0c3VwcGxpZXJAZ21haWwuY29tIiwicm9sZSI6NSwibGluZU1hbmFnZXIiOjh9LCJpYXQiOjE1NzY3ODE3MDUsImV4cCI6MTU3Njg2ODEwNX0.p2Fz7nexRU6OXN0Qz9UoWU_YudVQidSDxlfRc4Gm5P0';
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
  
  const { getToken, checkSupplier, checkAdmin } = authHelper;

  describe('Auth Helper Tests', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo3LCJpc1ZlcmlmaWVkIjp0cnVlLCJlbWFpbCI6ImNhcmV0c3VwcGxpZXJAZ21haWwuY29tIiwicm9sZSI6NSwibGluZU1hbmFnZXIiOjh9LCJpYXQiOjE1NzY3ODE3MDUsImV4cCI6MTU3Njg2ODEwNX0.p2Fz7nexRU6OXN0Qz9UoWU_YudVQidSDxlfRc4Gm5P0';

      it('Should get the token ', () => {
        expect(getToken()).toEqual(token)
      });

      it('Should check for a supplier role', () => {
        checkSupplier();
      });

      it('Should check for an admin role', () => {
        checkAdmin();
      });
  });
