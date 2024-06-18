require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const shipwreckRoutes = require('./routes/shipwrecks');
const provincRrouter = require('./routes/province');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use('/shipwrecks', shipwreckRoutes);
app.use('/province',  provincRrouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
