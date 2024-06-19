const express = require('express');
const nameRouter = express.Router();

const mongoose = require('mongoose');
const Sample = require('../models/sample');


nameRouter.get('/search', async (req, res) => {
  const userQuery = req.query.q;
  if (!userQuery) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }
  console.log(userQuery);
  const words = userQuery.split(' ');

  const mustQueries = words.map(word => ({
    text: {
      query: word,
      path: "name",
      fuzzy: {}
    }
  }));
    
    const pipeline = [
      {
        $search: {
          index: 'sampleSearch',
          compound: {
            must: mustQueries,
          }
        }
      }
    ];
  
    try {
      const results = await Sample.aggregate(pipeline).exec();
      res.send({"results": results});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = nameRouter;