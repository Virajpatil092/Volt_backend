const express = require('express');
const Battery = require('../models/Battery');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const battery = await Battery.create(req.body);
  res.json(battery);
});

router.get('/', auth, async (req, res) => {
  const batteries = await Battery.find();
  res.json(batteries);
});

router.get('/:id', auth, async (req, res) => {
  const battery = await Battery.findById(req.params.id);
  res.json(battery);
});

router.delete('/:id', auth, async (req, res) => {
  await Battery.findByIdAndDelete(req.params.id);
  res.json({ message: 'Battery deleted' });
});

module.exports = router;
