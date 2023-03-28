const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../midlewares");

let singup = async (req, res) => {
  const { email, password } = req.body;
  const findedUser = await User.findOne({ email });
  if (findedUser) {
    throw new HttpError(409, `Email in use`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const user = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json(user);
};

singup = ctrlWrapper(singup);

module.exports = singup;
