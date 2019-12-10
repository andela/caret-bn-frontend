export default () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        hostUrl: __API__,
      };
    default:
      return {
        hostUrl: 'https://caret-bn-backend-staging.herokuapp.com/api/v1/',
      };
  }
};
