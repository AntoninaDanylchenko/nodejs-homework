const { Contact } = require("../../models/index");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    const error = new Error(`Not found`);
    error.status = 404;
    throw error;
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
    message: "contact deleted",
  });
};

module.exports = removeContact;
