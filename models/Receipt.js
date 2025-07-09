const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
  customerName: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  code: String,
  gstin: String,
  accessories: Boolean,
  paymentType: String,
  specialDiscount: Number,
  items: [
    {
      product: {
        id: String,
        modelName: String,
        batteryName: String,
        range: Number,
        rate: Number,
        availableQuantity: Number,
      },
      model: {
        name: String,
        accessoryCharge: Number,
      },
      battery: {
        name: String,
        capacity: String,
      },
      range: Number,
      rate: Number,
      quantity: Number,
      amount: Number,
      color: String,
      hsnCode: String,
      batteryNumber: String,
      chargerNumber: String,
      chassisNumber: String,
    },
  ],
  subtotal: Number,
  accessoryCharges: Number,
  discount: Number,
  taxableAmount: Number,
  cgst: Number,
  sgst: Number,
  totalAmount: Number,
  receiptNumber: String,
  date: String,
  finalAmount: Number,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Receipt', receiptSchema);
