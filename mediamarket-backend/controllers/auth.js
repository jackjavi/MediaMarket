const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // compare password
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: user, token });
};

const updateUser = async (req, res) => {
  const {
    params: { id: userParamsId },
  } = req;

  const user = await User.findOneAndUpdate({ _id: userParamsId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new NotFoundError(`No user with id ${userParamsId}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

module.exports = {
  register,
  login,
  updateUser,
};
