const extractObject = (queryString) => new Promise((resolve, reject) => {
  try {
    const urlParams = new URLSearchParams(queryString);
    const user = JSON.parse(urlParams.get('user'));
    resolve(user);
  } catch (error) {
    reject(error.message);
  }
});

export default extractObject;
