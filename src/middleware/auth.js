const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { UnAuthorizedApiError } = require("../errors");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthorizedApiError("Kimlik doğrulama başarısız.");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = User.findById(payload.userId).select("-password");
    req.user = user;
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnAuthorizedApiError(`Kimlik doğrulama başarısız. ${error}`);
  }
};

module.exports = {
  auth,
};
