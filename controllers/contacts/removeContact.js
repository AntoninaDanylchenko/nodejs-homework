const { Contact } = require("../../models/index");
const { HttpError } = require("../../helpers");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const { id } = req.user;
  console.log(id);
  const deletedContact = await Contact.findOneAndRemove({
    _id: contactId,
    owner: id,
  });
  if (!deletedContact) {
    throw new HttpError(404, "Not found");
  }

  res.status(200).json("contact deleted");
};

module.exports = removeContact;
