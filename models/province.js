const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema({
  province: { type: String, required: true },
  capital: { type: String, required: true }
});

const Province = mongoose.model('Province', provinceSchema);

module.exports = Province;
