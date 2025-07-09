const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  model: {
    name: { type: String, required: true },
    accessoryCharge: { type: Number, required: true }
  },
  battery: {
    name: { type: String, required: true },
    capacity: { type: String, required: true }
  },
  range: { type: Number, required: true },
  rate: { type: Number, required: true },
  availableQuantity: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
