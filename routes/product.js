const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

router.get('/', auth, async (req, res) => {
  const products = await Product.find(); // ✅ removed .populate()
  res.json(products);
});

router.get('/:id', auth, async (req, res) => {
  const product = await Product.findById(req.params.id); // ✅ removed .populate()
  res.json(product);
});

router.put('/:id', auth, async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', auth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
});

module.exports = router;
