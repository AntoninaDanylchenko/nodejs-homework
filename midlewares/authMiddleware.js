const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");

const authMiddleware = (req, res, next) => {
  const [bearer, token] = req.headers.authorization.split(" ");
  try {
    if (!token || bearer !== "Bearer") {
      throw new HttpError(401, "Not authorized");
    }
    const user = jwt.verify(token, process.env.SECRET_KEY);

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authMiddleware };
