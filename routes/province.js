const express = require('express');
const provincRrouter = express.Router();
const mongoose = require('mongoose');
const Province = require('../models/province');

// const normalizeText = (text) => {
//     return text.normalize('NFD')
//                .replace(/[\u0300-\u036f]/g, '')
//                .replace(/[-.]/g, ' ')
//                .replace(/\s+/g, ' ')
//                .toLowerCase();
// };

provincRrouter.get('/search', async (req, res) => {
  const query = req.query.q || '';
//   console.log(query);
//   const normalizedQuery = normalizeText(query);
//   console.log(normalizedQuery);
  const pipeline = [
    {
      $search: {
        index: 'default',
        text: {
          query: query,
          path: {
            wildcard: "*",
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
    const results = await Province.aggregate(pipeline).exec();
    res.send({"results": results});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = provincRrouter;
