const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  passowrd: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  club: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)