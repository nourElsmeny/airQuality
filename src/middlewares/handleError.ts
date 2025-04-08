import moment from 'moment';
import type { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  // console.log(err);

  const statusCode: number = err.statusCode || 500;
  const message: string = err.message || 'Something went wrong';
  const error = {
    statusCode,
    message,
    timestamp: moment().utc().format('Y-M-D h:m:ss'),
  };
  res.status(statusCode).json(error);
};

export default errorMiddleware;
