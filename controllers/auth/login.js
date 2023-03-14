const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(User);
  if (!user || !user.comparePassword(password)) {
    throw new HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1d" });
  const logedUser = await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json(logedUser);
};

module.exports = login;
