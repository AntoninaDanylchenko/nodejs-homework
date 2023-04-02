const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../midlewares");

const jwt = require("jsonwebtoken");

let login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.verify || !user.comparePassword(password)) {
    throw new HttpError(
      401,
      "Email is wrong or not verify, or password is wrong"
    );
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  const logedUser = await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json(logedUser);
};

login = ctrlWrapper(login);

module.exports = login;
