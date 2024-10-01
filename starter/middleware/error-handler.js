import { CustomAPIError } from '../errors/custom-api.js';
import { StatusCodes } from 'http-status-codes';

export const errorHandlerMiddleware = (err, req, res, next) => {
  // not needed but added for clarity to also output the error to the console 😛😛
  console.error(err);

  let customError = {
    //set default
    StatusCode: err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'something went wrong try again later',
  };

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  if (err.code && err.code === 11000) {
    customError = {
      StatusCode: 400,
      msg: `Duplicate value entered for ${err.KeyValue} field, please choose another value`,
    };
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.StatusCode).json({ msg: customError.msg });
};
