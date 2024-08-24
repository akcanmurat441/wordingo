const CustomApiError = require("./custom-error");

const { StatusCodes } = require("http-status-codes");

class UnauthorizedApiError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedApiError;
