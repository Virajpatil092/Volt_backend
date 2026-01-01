const express = require('express');
const Model = require('../models/Model');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const model = await Model.create(req.body);
  res.json(model);
});

router.get('/', auth, async (req, res) => {
  const models = await Model.find();
  res.json(models);
});

router.get('/:id', auth, async (req, res) => {
  const model = await Model.findById(req.params.id);
  res.json(model);
});

router.delete('/:id', auth, async (req, res) => {
  await Model.findByIdAndDelete(req.params.id);
  res.json({ message: 'Model deleted' });
});

module.exports = router;
