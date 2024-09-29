import { CustomAPIError } from '../errors/custom-api.js';
import { StatusCodes } from 'http-status-codes';

export const errorHandlerMiddleware = (err, req, res, next) => {
  // not needed but added for clarity to also output the error to the console 😛😛
  console.error(err);

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};
