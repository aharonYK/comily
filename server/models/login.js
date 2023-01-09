const Joi = require('joi')
module.exports.validate =  function validateLogin(user) {
    const schema = {
        email: Joi.string().min(4).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(user, schema);
  }