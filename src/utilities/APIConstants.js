export default () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        hostUrl: DEVELOPMENT_API,
      };
    case 'production':
      return {
        hostUrl: PRODUCTION_API,
      };
    default:
      return {
        hostUrl: 'http://localhost:3000/',
      };
  }
};
