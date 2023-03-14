const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const updateSubscription = async (req, res) => {
  const { id } = req.user;
  const updatedUser = await User.findByIdAndUpdate(id, req.body);
  if (!updatedUser) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json(updatedUser);
};
module.exports = updateSubscription;
