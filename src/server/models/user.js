import mongoose from 'mongoose';
import { hash, compare } from 'bcryptjs';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      validate: {
        validator: email => User.doesntExist({ email }),
        message: () => 'Email has already been taken.'
      }
    },
    username: {
      type: String,
      validate: {
        validator: username => User.doesntExist({ username }),
        message: () => 'Username has already been taken.'
      }
    },
    name: String,
    password: String,
    isVerified: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      default: 'USER'
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 12);
  }
});

userSchema.statics.doesntExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

userSchema.methods.matchesPassword = function(password) {
  return compare(password, this.password);
};

const User = model('User', userSchema);

export default User;
