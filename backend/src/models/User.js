const { Schema, model } = require('mongoose');
module.exports = model('User', new Schema({
  googleId: { type: String, unique: true, required: true },
  email: String, emailVerified: Boolean,
  name: String, givenName: String, familyName: String, picture: String,
  locale: String, timezone: String,
  loginCount: { type: Number, default: 0 },
  lastLoginAt: Date,
}, { timestamps: true }));
