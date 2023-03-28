const singup = require("./singup");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");

module.exports = {
  singup,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
};
