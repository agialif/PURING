const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object({
      name: Joi.string().min(6).max(255).required(),
      username: Joi.string().min(6).max(255).required(),
      email: Joi.string().min(6).max(255).required().email(),
      password: Joi.string().min(6).max(1024).required(),
      gender: Joi.string().required(),
      birthdate: Joi.date().max('1-1-2004').iso(),
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
    });

    return schema.validate(data);
};


module.exports = {
    registerValidation,
    loginValidation,
    adminValidation
};