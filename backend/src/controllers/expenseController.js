const expenseService = require('../services/expenseService');
const asyncHandler = require('../utils/asyncHandler');

exports.create = asyncHandler(async (req, res) => res.json(await expenseService.create(req.uid, req.body)));
exports.list = asyncHandler(async (req, res) => res.json(await expenseService.list(req.uid)));
exports.remove = asyncHandler(async (req, res) => { await expenseService.remove(req.uid, req.params.id); res.json({ ok: true }); });
