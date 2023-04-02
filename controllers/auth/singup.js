const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const { User } = require("../../models");
const { HttpError, sendEmail } = require("../../helpers");
const { ctrlWrapper } = require("../../midlewares");

let singup = async (req, res) => {
  const { email, password } = req.body;
  const findedUser = await User.findOne({ email });
  if (findedUser) {
    throw new HttpError(409, `Email in use`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();
  const user = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Confirmation of registration on the website",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken} target="_blank>Click to confirm the email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json(user);
};

singup = ctrlWrapper(singup);

module.exports = singup;
