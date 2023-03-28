const { Contact } = require("../../models/index");
const { HttpError } = require("../../helpers");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { id } = req.user;
  const searchedContact = await Contact.findOne({
    _id: contactId,
    owner: id,
  });
  if (!searchedContact) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json(searchedContact);
};

module.exports = getContactById;
