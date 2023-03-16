const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        maxlength:50
    },
    email:{
        type: String,
        trim:true,
        unique: 1 
    },
    password:{
        type: String,
        minglength: 5
    },
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    }
  });

  module.exports = mongoose.model('user', UserSchema);