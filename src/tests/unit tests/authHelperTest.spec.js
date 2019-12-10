import authHelper from "../../helpers/authHelper";
import jwtDecode from "jwt-decode";
import localStorageMock from "../mocks/localStorageMock";

class LocalStorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo0LCJpc1ZlcmlmaWVkIjp0cnVlLCJlbWFpbCI6InVzZXJAY2FyZXRibi5jb20iLCJyb2xlIjo1LCJsaW5lTWFuYWdlciI6OH0sImlhdCI6MTU3NjE2NzIxNCwiZXhwIjoxNTc2MjUzNjE0fQ.4B3L_z0jwWvF6qEzPxPHYTt4CUNhpgEPCBWEaepJPuM';
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
  
  const { getToken, checkSupplier } = authHelper;

  describe('Auth Helper Tests', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo0LCJpc1ZlcmlmaWVkIjp0cnVlLCJlbWFpbCI6InVzZXJAY2FyZXRibi5jb20iLCJyb2xlIjo1LCJsaW5lTWFuYWdlciI6OH0sImlhdCI6MTU3NjE2NzIxNCwiZXhwIjoxNTc2MjUzNjE0fQ.4B3L_z0jwWvF6qEzPxPHYTt4CUNhpgEPCBWEaepJPuM';

      it('Shpuld get the token ', () => {
        expect(getToken()).toEqual(token)
      });

      it('Should check for a supplier role', () => {
        checkSupplier();

      });
  });
