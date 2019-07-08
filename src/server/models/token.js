const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const tokenSchema = new Schema(
  {
    token: String,
    action: String,
    user: {
      type: ObjectId,
      ref: 'User'
    },
    expireAt: {
      type: Date,
      default: Date.now,
      expires: 60000 // 1min
    }
  },
  {
    timestamps: true
  }
);

const Token = model('Token', tokenSchema);

module.exports = Token;
