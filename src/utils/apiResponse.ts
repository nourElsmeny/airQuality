import moment from 'moment';
import { Response } from 'express';

const resHandler = async (res: Response, message: string, context: any = {}, statusCode = 200) => {
  const response = {
    statusCode,
    message,
    data: context,
    timestamp: moment().format('Y-M-D h:m:ss'),
  };

  res.status(statusCode).json(response);
};

export default resHandler;
