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
  const transformedQuery = transformUserQuery(userQuery);
  // const words = userQuery.split(' ');

  // const mustQueries = words.map(word => ({
  //   text: {
  //     query: word,
  //     path: {
  //       wildcard: '*',
  //       fuzzy: {
  //         maxEdits: 2
  //       }
  //     }
  //   }
  // }));
    
  const pipeline = [
    {
      $search: {
        index: 'sampleSearch',
        compound: {
          must: [
            {
              text: {
                query: transformedQuery,
                path: 'name',
                fuzzy: {
                  maxEdits: 2  // Adjust maxEdits as per your tolerance for typos or variations
                }
              }
            }
          ]
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

  function transformUserQuery(query) {
    return query.replace(/[._-]/g, ' ');
  }
  
  
  module.exports = nameRouter;