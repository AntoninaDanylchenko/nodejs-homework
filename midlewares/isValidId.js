const { isValidObjectId } = require("mongoose");
const { createError } = require("../../helpers");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    createError(400, "Not foundt");
  }
  next();
};

module.exports = isValidId;
