const { Schema, model } = require('mongoose');
module.exports = model('Expense', new Schema({
  userId: { type: Schema.Types.ObjectId, index: true, required: true },
  amount: { type: Number, required: true, min: 0 },
  date: { type: Date, required: true, default: Date.now },
  description: { type: String, default: '', maxlength: 500 },
}, { timestamps: true }));
