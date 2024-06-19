const mongoose = require('mongoose');

const nameSchema = new mongoose.Schema({
    name: { type: String, required: true}
})

const Sample = mongoose.model('Sample', nameSchema);
module.exports = Sample;