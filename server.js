const express = require('express');
const dotenv = require('dotenv');

// Load env config
dotenv.config({ path: './config/config.env' });

const app = express();

// Routes
app.get('/', (req, res) => {
  res.send('Hello from express');
});

// Listen server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
