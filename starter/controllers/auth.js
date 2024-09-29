import { User } from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

// Register a new user in the database and return a JWT token for the user to authenticate themselves
const register = async (req, res) => {
  const user = await User.create(req.body);
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

// Authenticate a user by checking the email and password in the request body and return a JWT token for the user to authenticate themselves
const login = async (req, res) => {
  const { email, password } = req.body;

  // check if the email and password are provided
  if (!email || !password) {
    throw new BadRequestError('please provide email and password');
  }

  const user = await User.findOne({ email });

  // check if the user exists
  if (!user) {
    throw new UnauthenticatedError('invalid credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);

  // check if the password is correct
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('invalid credentials');
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

export { login, register };
