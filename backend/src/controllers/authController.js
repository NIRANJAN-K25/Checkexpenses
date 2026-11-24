const env = require('../config/env');
const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');

exports.config = (_, res) => res.json({ clientId: env.googleClientId });
exports.google = asyncHandler(async (req, res) => {
  const { user, token } = await authService.loginWithGoogle(req.body.credential, req.body.timezone);
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: env.isProd, maxAge: 30 * 864e5 });
  res.json({ name: user.name, email: user.email, picture: user.picture });
});
exports.logout = (_, res) => { res.clearCookie('token'); res.json({ ok: true }); };
exports.me = asyncHandler(async (req, res) => {
  const u = await authService.getUser(req.uid);
  if (!u) return res.status(401).json({ error: 'Not logged in' });
  res.json({ name: u.name, email: u.email, picture: u.picture });
});
