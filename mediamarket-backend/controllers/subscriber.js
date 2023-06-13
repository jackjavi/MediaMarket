const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const Subscriber = require("../models/Subscriber");

const subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequestError("Please provide an email");
  }

  const subscriber = await Subscriber.create({ email });
  res.status(StatusCodes.CREATED).json({ subscriber });
};

module.exports = {
  subscribe,
};
