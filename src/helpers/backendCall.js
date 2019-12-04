import axios from 'axios';

export default axios.create({
  baseURL: 'https://caret-bn-backend-staging.herokuapp.com/api/v1',
});
