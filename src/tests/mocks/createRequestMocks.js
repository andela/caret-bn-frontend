const mockFunc = jest.fn();
const confirmRequest = mockFunc;
const cancelDestination = mockFunc;
const removeDestination = mockFunc;
const sendRequest = mockFunc;
const getLocations = mockFunc;
const addDestinationComponent = mockFunc;

export const allProps = {
    locations: {
        data: [{
            id: 1,
            name: 'Blantyre',
        }, {
            id: 2,
            name: 'Lilongwe',
        }, {
            id: 3,
            name: 'Zomba',
        }],
    },
    bookings: {
        data: [
            {
                id: 1,
                accommodation: {
                    name: 'Vickies',
                },
                checkIn: '24-12-2019',
                status: {
                    name: 'Approved',
                },
            },
        ],
    },
    confirmRequest,
    cancelDestination,
    removeDestination,
};


export const oneWayRequest = {
    request: {
        typeId: 1,
        locationId: 1,
        departureDate: '2020-12-19',
        returnDate: '',
        destinations: [
            {
                locationId: 2,
                arrivalDate: '2020-12-20',
                reasons: 'jfdkjfiodfkpofdkjodfkpok',
            },
        ],
    },
};

export const returnRequest = {
    request: {
        typeId: 2,
        locationId: 1,
        departureDate: '2020-12-19',
        returnDate: '2020-12-31',
        destinations: [
            {
                locationId: 2,
                arrivalDate: '2020-12-20',
                departureDate: '2020-12-30',
                reasons: 'jfdkjfiodfkpofdkjodfkpok',
                isFinal: true,
            },
        ],
    },
};
export const validProps = {
    locations: {
        data: {
            data:
                [
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
    },
    bookings: {
        data: [
            {
                id: 1,
                name: 'Zinizir',
            },
            {
                id: 1,
                name: 'Zodethsa',
            },
            {
                id: 1,
                name: 'Pa Kamaba',
            },
            {
                id: 1,
                name: 'Stereo',
            },
        ],
    },
    sendRequest,
    getLocations,
    addDestinationComponent,
};
