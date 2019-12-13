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

const newAccommodationCreated = {
  status: 201,
  response: {
    data: {
      id: 20,
      name: 'test accommodation',
      description: 'test description',
      locationId: 2,
      availableSpace: 50,
      cost: 800,
      currency: 'USD',
      highlights: 'highlights here',
      amenities: 'highlights here',
      owner: 4,
      images: 'http://res.cloudinary.com/ddypcld8o/image/upload/v1576096870/saqv2mqb2ndg9qh2bnxb.jpg',
      slug: 'test-accommodation',
      updatedAt: '2019-12-11',
      createdAt: '2019-12-11',
      isActivated: true,
    },
  },
};

const newAccommodationFailed = {
  status: 400,
  response: {
    status: 400,
    message: 'This accommodation already exists!',
  },
};

const locations = {
  status: 200,
  response: {
    status: 200,
    data: [
      {
        id: 1,
        name: 'Blantyre',
      },
      {
        id: 2,
        name: 'Zomba',
      },
      {
        id: 3,
        name: 'Lilongwe',
      },
      {
        id: 4,
        name: 'Mzuzu',
      },

    ],
  },
};

const locationsError = {
  status: 400,
  response: {
    status: 400,
    message: 'No locations',
  },
};

export default {
  loginSuccess, loginFailure, newAccommodationCreated, newAccommodationFailed, locations, locationsError,
};
