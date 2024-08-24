const CustomApiError = require("./custom-error");
const { StatusCodes } = require("http-status-codes");

class ForbiddenApiError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = ForbiddenApiError;
