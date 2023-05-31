import Joi from 'joi';

export const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),

    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6).max(10).required(),

    confirmPassword: Joi.ref('password'),
  });
  return schema.validate(data);
};

export const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),

    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  });
  return schema.validate(data);
};
