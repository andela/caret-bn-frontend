const loginSuccess = {
  status: 200,
  response: {
    status: 200,
    message: 'User logged in successfully!',
    data: {
      userID: 8,
      username: 'demoManager',
      email: 'caretmanager@gmail.com',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo4LCJpc1ZlcmlmaWVkIjp0cnVlLCJlbWFpbCI6ImNhcmV0bWFuYWdlckBnbWFpbC5jb20iLCJyb2xlIjo0LCJsaW5lTWFuYWdlciI6OX0sImlhdCI6MTU3NTgxMTE1MCwiZXhwIjoxNTc1ODk3NTUwfQ.pRHqycBLboBC3ohC5OPA0_XrOaB5_jLgPlw3W3WSxsA',
    },
  },
};

const loginFailure = {
  status: 400,
  response: {
    status: 400,
    message: 'Incorrect email or password!',
  },
};

export default { loginSuccess, loginFailure };
