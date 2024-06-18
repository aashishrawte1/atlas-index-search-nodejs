const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Normalize text function for special cases
const normalizeText = (text) => {
    return text.normalize('NFD')
               .replace(/[\u0300-\u036f]/g, '')
               .replace(/[-.]/g, ' ')
               .replace(/\s+/g, ' ')
               .toLowerCase();
};

// Fuzzy search route
router.get('/', async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ msg: 'Query is required' });
        }

        const normalizedQuery = normalizeText(query);

        const items = await Item.aggregate([
            {
                $search: {
                    index: 'default',
                    text: {
                        query: normalizedQuery,
                        path: ['normalized'],
                        fuzzy: {
                            maxEdits: 2,
                            prefixLength: 2,
                        },
                        analyzer: "customAnalyzer" // Using the custom analyzer
                    },
                },
            },
            // {
            //     $collation: { locale: 'en', strength: 1 } // For accent-insensitive search
            // }
        ]);

        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
