require('dotenv').config();
const mongoose = require('mongoose');
const Item = require('./models/item'); // Adjust the path as necessary

const normalizeText = (text) => {
    return text.normalize('NFD')
               .replace(/[\u0300-\u036f]/g, '') // Remove accents
               .replace(/[-.]/g, ' ') // Replace '-' and '.' with space
               .replace(/\s+/g, ' ') // Replace multiple spaces with single space
               .toLowerCase(); // Convert to lowercase
};

const updateNormalizedField = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        const items = await Item.find();
        for (const item of items) {
            item.normalized = normalizeText(item.name + ' ' + item.description);
            await item.save();
        }

        console.log('Normalization update complete');
        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        mongoose.connection.close();
    }
};

updateNormalizedField();
