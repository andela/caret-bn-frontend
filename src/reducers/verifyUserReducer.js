const initialState = {
  payload: null,
  error: null,
};
const VerifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VERIFY_SUCCESS':
      return {
        ...state,
        payload: action.payload,
        error: null,
      };
    case 'VERIFY_ERROR':
      return {
        ...state,
        payload: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default VerifyReducer;
