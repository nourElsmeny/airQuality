class APIError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Common HTTP Errors.
const badRequest = (message = 'Bad Request') => new APIError(400, message);
const unauthorized = (message = 'Unauthorized') => new APIError(401, message);
const forbidden = (message = 'Forbidden') => new APIError(403, message);
const notFound = (message = 'Not Found') => new APIError(404, message);
const notFoundFile = (message = 'Not Found') => new APIError(504, message);
const methodNotAllowed = (message = 'Method Not Allowed') => new APIError(405, message);
const notAcceptable = (message = 'Not Acceptable') => new APIError(406, message);
const conflict = (message = 'Conflict') => new APIError(409, message);
const unprocessableEntity = (message = 'Unprocessable Entity') => new APIError(422, message);
const internalServerError = (message = 'Internal Server Error') => new APIError(500, message);

export {
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  methodNotAllowed,
  notAcceptable,
  conflict,
  unprocessableEntity,
  internalServerError,
  notFoundFile,
  APIError,
};
