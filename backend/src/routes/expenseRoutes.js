const router = require('express').Router();
const c = require('../controllers/expenseController');
const auth = require('../middleware/auth');
router.use(auth);
router.get('/', c.list);
router.post('/', c.create);
router.delete('/:id', c.remove);
module.exports = router;
