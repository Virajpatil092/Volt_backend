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

app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running`)

  setInterval(() => {
      fetch(process.env.BACKEND_URL + '/ping')
        .then(() => console.log('Self-ping success at', new Date().toLocaleTimeString()))
        .catch(err => console.error('Ping failed:', err.message));
    }, 5 * 60 * 1000);
});
