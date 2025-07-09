const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/models', require('./routes/model'));
app.use('/api/batteries', require('./routes/battery'));
app.use('/api/products', require('./routes/product'));
app.use('/api/receipts', require('./routes/receipt'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
