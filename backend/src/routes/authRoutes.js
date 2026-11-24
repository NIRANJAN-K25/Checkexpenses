const router = require('express').Router();
const c = require('../controllers/authController');
const auth = require('../middleware/auth');
router.get('/config', c.config);
router.post('/google', c.google);
router.post('/logout', c.logout);
router.get('/me', auth, c.me);
module.exports = router;
