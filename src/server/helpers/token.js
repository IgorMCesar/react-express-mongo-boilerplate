import { ApolloError } from 'apollo-server-express';
import crypto from 'crypto';

import { Token } from '../models/models';
import sendEmail from '../utils/sendEmail';

export const sendEmailWithToken = async (user, action) => {
  await Token.deleteOne({ user: user._id, action });

  const token = await Token.create({
    user: user._id,
    token: crypto.randomBytes(16).toString('hex'),
    action
  });

  // No await! If the email is not sent the user simply needs to ask for a new one!
  sendEmail('example@gmail.com', 'http://google.com');

  return token;
};
export const verifyToken = async (token, action) => {
  const message = 'We were unable to find a valid token. Your token may have expired.';

  const verifiedToken = await Token.findOne({ token, action });

  if (!verifiedToken) {
    throw new ApolloError(message, 'INVALID_TOKEN');
  }

  return verifiedToken;
};
