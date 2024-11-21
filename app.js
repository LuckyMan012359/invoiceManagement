const express = require('express');
const app = express();
const indexRoute = require('./routes/index');
const userRoute = require('./routes/user.route');
const transactionRouter = require('./routes/transaction.route');
const customerRouter = require('./routes/customer.route');
const { connectDB } = require('./config/connect');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 8080;

connectDB();
app.use(
  cors({
    origin: {},
  }),
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use((req, res, next) => {
  console.log(`\x1b[42m ${req.method} ${req.url} request received.\x1b[0m`);
  next();
});

app.use('/', indexRoute);
app.use('/api/user', userRoute);
app.use('/transaction', transactionRouter);
app.use('/api/customer', customerRouter);
app.get('*', (req, res) => {
  res.status(404).send('404! This is an invalid URL.');
});

app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}`);
});
