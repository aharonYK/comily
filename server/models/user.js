const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

//defines the schema that will be in the database
const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 2,
      },
      password: {
        type: String,
        required: true,
        maxlength: 1024,
        minlength: 5,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 2,
        unique: true
      },
})

// //function that takes the id from and generate it to gibrish with the special key word
Schema.methods.generateJWT = function(){
    const token = jwt.sign({_id: this.id}, 'dan and yali'); 
    return token
};

const User = mongoose.model('User', Schema);

function validateUser(user) {
    const schema = {
      name: Joi.string().min(2).max(50).required(),
      email: Joi.string().min(4).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
    };
  
    return Joi.validate(user, schema); //compare if the client input is valid to our schema
  }

  module.exports.validate = validateUser
  module.exports.User = User