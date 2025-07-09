const mongoose = require('mongoose');

const batterySchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: String, required: true }
});

module.exports = mongoose.model('Battery', batterySchema);
