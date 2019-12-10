export default () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        hostUrl: __API__,
      };
    default:
      return {
        hostUrl: 'http://localhost:3000/',
      };
  }
};
