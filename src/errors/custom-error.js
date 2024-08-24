class CustomApiError extends Error {
  constructor(message, statusCode) {
    super(message, statusCode);
  }
}

module.exports = CustomApiError;
