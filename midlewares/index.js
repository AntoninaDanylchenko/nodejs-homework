const { validation, validationFavorite } = require("./validation");
const ctrlWrapper = require("./ctrlWrapper");
const {
  handleSchemaErrorValidation,
} = require("./handleSchemaErrorValidation");
const isValidId = require("./isValidId");
// const { authCurrent } = require("./authCurrent");
const { authMiddleware } = require("./authMiddleware");

module.exports = {
  validation,
  validationFavorite,
  ctrlWrapper,
  handleSchemaErrorValidation,
  isValidId,
  authMiddleware,
  // authCurrent,
};
