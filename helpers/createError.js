const createError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  throw err;
};

module.exports = createError;
