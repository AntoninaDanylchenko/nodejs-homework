const { Contact } = require("../../models/index");
const { HttpError } = require("../../helpers");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { id } = req.user;
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: id },
    { ...req.body },
    {
      new: true,
    }
  );
  if (!updatedContact) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json(updatedContact);
};

module.exports = updateContact;
