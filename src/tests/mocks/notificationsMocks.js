const notificationsMocks = {
  itemRead: {
    id: 67,
    entity: 'booking',
    entityId: 60,
    activity: 'A booking has been placed. Click here to view: http://caret-bn-backend-staging.herokuapp.com/api/v1/accommodations/bookings/60.',
    isRead: true,
    createdAt: '2019-12-28',
    timestamp: '11:50:09',
    updatedAt: '2019-12-30',
    notifiedUser: {
      id: 3,
      email: 'caretuser@gmail.com',
      username: 'Caret User',
    },
  },
  itemUnread: {
    id: 67,
    entity: 'booking',
    entityId: 60,
    activity: 'A booking has been placed. Click here to view: http://caret-bn-backend-staging.herokuapp.com/api/v1/accommodations/bookings/60.',
    isRead: false,
    createdAt: '2019-12-28',
    timestamp: '11:50:09',
    updatedAt: '2019-12-30',
    notifiedUser: {
      id: 3,
      email: 'caretuser@gmail.com',
      username: 'Caret User',
    },
  },
};

export default notificationsMocks;
