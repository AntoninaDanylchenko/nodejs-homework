const { Contact } = require("../../models/index");
const { HttpError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { id } = req.user;
  const updatedStatus = await Contact.findOneAndUpdate(
    { _id: contactId, owner: id },
    { ...req.body }
  );
  if (!updatedStatus) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json(updatedStatus);
};

module.exports = updateStatusContact;
