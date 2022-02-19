const Joi = require("joi");

exports.userSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().required(),
  password: Joi.string().required(),
});

exports.loginSchema = Joi.object({
  emailORusername: Joi.string().required(),
  password: Joi.string().required(),
});
