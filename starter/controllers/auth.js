import { User } from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import bcrybt from 'bcryptjs';
import { BadRequestError } from '../errors/index.js';

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const salt = await bcrybt.genSalt(10); // 10 is the number of rounds to generate the salt for the hash function
  const hashedPassword = await bcrybt.hash(password, salt);

  const tempUser = {
    name,
    email,
    password: hashedPassword,
  };
  // if (!name || !email || !password) {
  //   throw new BadRequestError('Please provide name, email and password');
  // }

  const user = await User.create(tempUser);
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send('login user');
};

export { login, register };
