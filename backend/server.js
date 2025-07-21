require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Some error occurred while connecting to database:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`SERVER HAS STARTED AT PORT ${PORT}`);
});
