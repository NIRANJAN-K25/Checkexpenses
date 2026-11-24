const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const env = require('../config/env');
const User = require('../models/User');
const httpError = require('../utils/httpError');
const google = new OAuth2Client(env.googleClientId);

exports.loginWithGoogle = async (credential, timezone) => {
  let p;
  try { p = (await google.verifyIdToken({ idToken: credential, audience: env.googleClientId })).getPayload(); }
  catch { throw httpError(401, 'Google login failed'); }
  const user = await User.findOneAndUpdate({ googleId: p.sub },
    { $set: { email: p.email, emailVerified: !!p.email_verified, name: p.name, givenName: p.given_name,
        familyName: p.family_name, picture: p.picture, locale: p.locale,
        timezone: String(timezone || '').slice(0, 60), lastLoginAt: new Date() },
      $inc: { loginCount: 1 } }, { upsert: true, new: true });
  return { user, token: jwt.sign({ uid: user.id }, env.jwtSecret, { expiresIn: '30d' }) };
};
exports.verifyToken = token => jwt.verify(token, env.jwtSecret).uid;
exports.getUser = id => User.findById(id);
