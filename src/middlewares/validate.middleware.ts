import { Request, Response, NextFunction } from 'express';
import { unprocessableEntity } from '../common/apiError';

const validateMiddleware =
  (schema: any, type: 'body' | 'query' | 'params' | 'headers' = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    // Validate request body.
    // console.log('data from validate middleware', req[type]);
    // console.log('type of data from validate middleware', typeof req[type]);

    const { error, value } = schema.validate(req[type], { abortEarly: false });

    if (!error) {
      // Replace req object with the data after Joi validation.
      req[type] = value;
      return next();
    }

    // There is a validation error.
    const { details } = error;
    const message = details.map((d: any) => d.message.replace(/['"]+/g, '')).join(',');

    // Send back the JSON error response.
    throw unprocessableEntity(`${message}, Please review.`);
  };

export default validateMiddleware;
