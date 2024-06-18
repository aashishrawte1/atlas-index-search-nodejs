const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Shipwreck = require('../models/shipwreck');

router.get('/search', async (req, res) => {
  const query = req.query.q || '';

  const pipeline = [
    {
      $search: {
        index: 'searchGeoData',
        text: {
          query: query,
          path: {
            wildcard: '*'
          },
          fuzzy: {
            maxEdits: 2
          }
        }
      }
    },
    {
      $limit: 2
    }
  ];

  try {
    const results = await Shipwreck.aggregate(pipeline).exec();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
