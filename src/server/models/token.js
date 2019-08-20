import mongoose from 'mongoose';

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
    expires: {
      type: Date,
      default: new Date(Date.now() + 12 * 60 * 60 * 1000),
      index: {
        expireAfterSeconds: 12 * 60 * 60
      }
    }
  },
  {
    timestamps: true
  }
);

const Token = model('Token', tokenSchema);

export default Token;
