const authService = require('../services/authService');
module.exports = (req, res, next) => {
  try { req.uid = authService.verifyToken(req.cookies.token); next(); }
  catch { res.status(401).json({ error: 'Not logged in' }); }
};
