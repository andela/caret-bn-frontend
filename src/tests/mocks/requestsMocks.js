const requestsMocks = {
  itemPending: {
    id: 1,
    reasons: 'Partner Company Meeting',
    departureDate: '2019-11-21',
    returnDate: '2019-11-21',
    requester: {
      id: 3,
      username: 'Caret User',
      email: 'caretuser@gmail.com',
    },
    origin: {
      country: 'Nigeria',
      id: 5,
      name: 'Lagos Office',
    },
    type: {
      id: 5,
      name: 'Lagos Office',
    },
    status: {
      id: 1,
      name: 'Pending',
    },
    destinations: [
      {
        id: 1,
        reasons: 'Partner Company Meeting',
        arrivalDate: '2019-11-21',
        departureDate: null,
        location: {
          country: 'Nigeria',
          id: 5,
          name: 'Lagos Office',
        },
      },
    ],
  },

  itemRejected: {
    id: 1,
    reasons: 'Partner Company Meeting',
    departureDate: '2019-11-21',
    returnDate: '2019-11-21',
    requester: {
      id: 3,
      username: 'Caret User',
      email: 'caretuser@gmail.com',
    },
    origin: {
      country: 'Nigeria',
      id: 5,
      name: 'Lagos Office',
    },
    type: {
      id: 5,
      name: 'Lagos Office',
    },
    status: {
      id: 2,
      name: 'Rejected',
    },
    destinations: [
      {
        id: 1,
        reasons: 'Partner Company Meeting',
        arrivalDate: '2019-11-21',
        departureDate: null,
        location: {
          country: 'Nigeria',
          id: 5,
          name: 'Lagos Office',
        },
      },
    ],
  },

  itemApproved: {
    id: 1,
    reasons: 'Partner Company Meeting',
    departureDate: '2019-11-21',
    requester: {
      id: 3,
      username: 'Caret User',
      email: 'caretuser@gmail.com',
    },
    origin: {
      country: 'Nigeria',
      id: 5,
      name: 'Lagos Office',
    },
    returnDate: null,
    type: {
      id: 5,
      name: 'Lagos Office',
    },
    status: {
      id: 3,
      name: 'Approved',
    },
    destinations: [
      {
        id: 1,
        reasons: 'Partner Company Meeting',
        arrivalDate: '2019-11-21',
        departureDate: null,
        location: {
          country: 'Nigeria',
          id: 5,
          name: 'Lagos Office',
        },
      },
    ],
  },

  destination: {
    id: 1,
    reasons: 'Partner Company Meeting',
    arrivalDate: '2019-11-21',
    departureDate: null,
    location: {
      country: 'Nigeria',
      id: 5,
      name: 'Lagos Office',
    },
  },

  viewRequestsProps: {
    requests: {
      dataError: {},
      data: {},
      singleData: {},
    },
    searchRequests: {
      status: '',
      searchData: null,
      searchDataError: null,
    },
  },

  managerViewRequestsProps: {
    requests: {
      dataError: {},
      data: {},
      singleData: {},
    },
    managerSearchRequest: {
      status: '',
      managerSearchData: null,
      managerSearchDataError: null,
    },
  },

  getLocationsProps: {
    locations: {
      data: null,
      dataError: null,
    },
  },


  data: [
    {
      requester: {
        email: 'example@gmail.com',
        id: 2,
        username: 'john',
      },
    },
    {
      requester: {
        email: 'example2@gmail.com',
        id: 3,
        username: 'johny',
      },
    },
    {
      requester: {
        email: 'example5@gmail.com',
        id: 5,
        username: 'paulin',
      },
    },
  ],

  dataEror: {
    message: 'this is an error',
  },
};

export default requestsMocks;
