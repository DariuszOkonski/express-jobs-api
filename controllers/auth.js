const { BadRequestError, UnauthenticatedError } = require('../errors');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
// const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  // TODO: this hashing functionality is moved to User model
  const user = await User.create({ ...req.body });

  // const token = jwt.sign({ userId: user._id, name: user.name }, 'jwtSecret', {
  //   expiresIn: '30d',
  // });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const token = user.createJWT();

  console.log(token);
  console.log(user);

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
