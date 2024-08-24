const CustomApiError = require("./custom-error");
const BadRequestApiError = require("./bad-request");
const UnAuthorizedApiError = require("./unauthorized");
const ForbiddenApiError = require("./forbidden");
const NotFoundApiError = require("./notfound");

module.exports = {
  CustomApiError,
  BadRequestApiError,
  UnAuthorizedApiError,
  ForbiddenApiError,
  NotFoundApiError,
};
