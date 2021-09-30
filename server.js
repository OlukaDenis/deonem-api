const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler.middleware');

// Load env config
dotenv.config({ path: './config/config.env' });
connectDB();

const bootcamps = require('./routes/bootcamps');

const app = express();
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use(
  '/api/v1/bootcamps', bootcamps,
);

app.use(errorHandler);
// Listen server
const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta.bold),
);

// Handle unhandled promise
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
