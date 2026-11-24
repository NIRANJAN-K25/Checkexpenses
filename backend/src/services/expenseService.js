const Expense = require('../models/Expense');
const httpError = require('../utils/httpError');

exports.create = (userId, { amount, date, description }) => {
  const amt = Number(amount), when = new Date(date || Date.now());
  if (!(amt >= 0) || isNaN(when)) throw httpError(400, 'Invalid amount or date');
  if (when.getTime() > Date.now() + 60000) throw httpError(400, 'Date cannot be in the future');
  return Expense.create({ userId, amount: amt, date: when, description: String(description || '').slice(0, 500) });
};
exports.list = userId => Expense.find({ userId }).sort({ date: -1 }).lean();
exports.remove = (userId, id) => Expense.deleteOne({ _id: id, userId });
