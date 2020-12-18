const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object({
      name: Joi.string().min(6).max(255).required(),
      username: Joi.string().min(6).max(255).required(),
      email: Joi.string().min(6).max(255).required().email(),
      password: Joi.string().min(6).max(1024).required(),
      gender: Joi.string().required(),
      birthdate: Joi.date().max('1-1-2004').iso(),
      phone: Joi.string().required(),
      raw_password: Joi.string.required()
    }).unknown();
    
    return schema.validate(data);
  };

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).max(255).required(),
        password: Joi.string().min(6).max(1024).required(),
    });

    return schema.validate(data);
};

const adminValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).max(255).required(),
        password: Joi.string().min(6).max(1024).required(),
        raw_password: Joi.string().required().min(6),
        name: Joi.string().required(),
        phone: Joi.string().required(),
        email: Joi.string().min(255).required().email()
    });

    return schema.validate(data);
};


module.exports = {
    registerValidation,
    loginValidation,
    adminValidation
};