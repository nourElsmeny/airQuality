import joi from "joi";
const schema = {
  nearestCity: joi.object().keys({
    lat: joi.string().required(),
    lon: joi.string().required(),
  }),
  "paris-air-quality": joi.object().keys({}),
};

export default schema;
