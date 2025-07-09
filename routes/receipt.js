const express = require('express');
const Receipt = require('../models/Receipt');
const auth = require('../middleware/auth');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Create new receipt
router.post('/', auth, async (req, res) => {
  const data = {
    ...req.body,
    receiptNumber: 'INV-' + uuidv4().slice(0, 8).toUpperCase()
  };
  const receipt = await Receipt.create(data);
  res.json(receipt);
});

// Get all receipts
router.get('/', auth, async (req, res) => {
  const receipts = await Receipt.find().sort({ createdAt: -1 });
  res.json(receipts);
});

// Get receipt by ID
router.get('/:id', auth, async (req, res) => {
  const receipt = await Receipt.findById(req.params.id);
  res.json(receipt);
});

router.post('/search', auth, async (req, res) => {
  try {
    const {
      fromDate,
      toDate,
      chassisNo,
      receiptNumber,
      phone,
      state,
      code,
      gstin
    } = req.body;

    const query = {};

    // Ensure proper ISO date strings in local time (IST)
    if (fromDate && toDate) {
      const from = new Date(new Date(fromDate).setHours(0, 0, 0, 0));
      const to = new Date(new Date(toDate).setHours(23, 59, 59, 999));

      if (!isNaN(from.getTime()) && !isNaN(to.getTime())) {
        query.createdAt = { $gte: from, $lte: to };
        console.log('Date filter:', from.toISOString(), '→', to.toISOString());
      }
    }

    // Case-insensitive partial matches
    if (chassisNo) query['items.chassisNumber'] = { $regex: chassisNo, $options: 'i' };
    if (receiptNumber) query.receiptNumber = { $regex: receiptNumber, $options: 'i' };
    if (phone) query.phone = { $regex: phone, $options: 'i' };
    if (state) query.state = { $regex: state, $options: 'i' };
    if (code) query.code = { $regex: code, $options: 'i' };
    if (gstin) query.gstin = { $regex: gstin, $options: 'i' };

    const results = await Receipt.find(query).sort({ createdAt: -1 });

    res.json(results);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Search failed', details: err.message });
  }
});

module.exports = router;
