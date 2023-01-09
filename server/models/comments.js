const mongoose = require("mongoose");
const Joi = require("joi");

//defines the schema that will be in the database
const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
      },
      message: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
      },
     
})

const Comment = mongoose.model('Comment', Schema)


function validateComment(comment) {
    const schema = {
      name: Joi.string().min(2).max(50).required(),
      message: Joi.string().min(5).max(255).required()
      
    };
  
    return Joi.validate(comment, schema); //compare if the client input is valid to our schema
  }

  module.exports.validate = validateComment
  module.exports.Comment = Comment