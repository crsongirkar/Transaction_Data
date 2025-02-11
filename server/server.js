const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();
const connectDB = require('./config/connectDB');
const transactionRoute = require('./routes/table.route');

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());

//Table Data
app.use('/api', transactionRoute);
app.use('/api', (req, res) => {
  res.send('search one');
});

const port = process.env.PORT || 8000;

const start = () => {
  try {
    app.listen(port, async () => {
      await connectDB(process.env.MONGODB_URI);
      console.log(`connected to port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
