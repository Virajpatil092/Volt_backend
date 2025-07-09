const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  accessoryCharge: { type: Number, required: true }
});

module.exports = mongoose.model('Model', modelSchema);
