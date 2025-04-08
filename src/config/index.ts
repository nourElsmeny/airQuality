import * as dotenv from "dotenv";
import configInterface from "../interfaces/config.interface";

import * as Joi from "joi";
import { badRequest } from "../common/apiError";
dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });

// Define a schema.
const configSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("development", "production")
      .required()
      .description("The current application environment."),
    PORT: Joi.number().default(3000).description("The port to bind."),
    REDISEX: Joi.number().description("The Redis expiration time."),
    REDISURL: Joi.string().description("The Redis URL."),
    REDISPASSWORD: Joi.string()
      .allow("", null)
      .empty(["", null])
      .description("The Redis Password."),

    AIRVISUAL: Joi.string().required().description("Air Quality Web URL"),
    // Database Configurations
    DB_HOST: Joi.string().required().description("The database host."),
    DB_PORT: Joi.string().required().description("The database port."),
    DB_DIALECT: Joi.string().required().description("The database dialect."),

    DB_USER: Joi.string().required().description("The database user."),
    DB_PASSWORD: Joi.string().required().description("The database password."),
    DB_NAME: Joi.string().required().description("The database name."),
    DB_LOGGING: Joi.boolean()
      .default(false)
      .description("The database logging."),
    API_KEY: Joi.string().default(false).description("The “iqair” API KEY."),
  })
  .unknown();

const { value: envVars, error } = configSchema.validate(process.env);

// There is a validation error
if (error) throw badRequest(`Config validation error: ${error.message}`);
// Environment Variables read from process env vars in local and from pre-defined vars at server.

const config: configInterface = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  db: {
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    dialect: envVars.DB_DIALECT,
    data: envVars.DATA,
    user: envVars.DB_USER,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_NAME,
  },

  redisURL: envVars.REDISURL,
  redisEX: envVars.REDISEX,
  redisPassword: envVars.REDISPASSWORD,
  apiKey: envVars.API_KEY,
  airVisual: envVars.AIRVISUAL,
};

export default config;
