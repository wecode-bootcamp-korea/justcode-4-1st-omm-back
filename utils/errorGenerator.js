async function errorGenerator(params) {
  const { statusCode, message } = params;
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

module.exports = errorGenerator;
