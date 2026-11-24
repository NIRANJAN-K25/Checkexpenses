const router = require('express').Router();
router.use('/auth', require('./authRoutes'));
router.use('/expenses', require('./expenseRoutes'));
router.use((_, res) => res.status(404).json({ error: 'Not found' }));
module.exports = router;
