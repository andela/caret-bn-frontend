import axios from 'axios';

const verifyData = {
  successState: {
    Verify: {
      payload: {
        msg: 'verified',
        status: 200,
      },
      error: null,
    },
  },
  mockSuccess: (payload = null) => {
    const data = {
      msg: 'msg',
      status: 200,
      payload,
    };
    axios.get.mockResolvedValue({
      data,
    });
  },
};
export default verifyData;
