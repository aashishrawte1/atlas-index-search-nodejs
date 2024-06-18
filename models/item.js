const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Function to normalize text
const normalizeText = (text) => {
    return text.normalize('NFD')
               .replace(/[\u0300-\u036f]/g, '') // Remove accents
               .replace(/[-.]/g, ' ') // Replace '-' and '.' with space
               .replace(/\s+/g, ' ') // Replace multiple spaces with single space
               .toLowerCase(); // Convert to lowercase
};

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    normalized: {
        type: String,
    },
});

// Create text index on fields for fuzzy search
ItemSchema.index({ name: 'text', description: 'text', normalized: 'text' });

ItemSchema.pre('save', function(next) {
    this.normalized = normalizeText(this.name + ' ' + this.description);
    next();
});

module.exports = mongoose.model('Item', ItemSchema);
