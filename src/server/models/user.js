const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: String,
    username: String,
    name: String,
    password: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
