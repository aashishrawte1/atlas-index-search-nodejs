require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://anqunix:anqunix@cluster0.npcl0ll.mongodb.net/sample_geospatial?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function runSearch(query) {
  try {
    await client.connect();
    const database = client.db('sample_geospatial');
    const collection = database.collection('shipwrecks');

    const pipeline = [
      {
        $search: {
          index: 'searchGeo',
          text: {
            query: query,
            path: {
              wildcard: '*'
            },
            fuzzy: {
              maxEdits: 2
            },
            analyzer: 'customAnalyzer'
          }
        }
      },
      {
        $limit: 2
      }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    console.log(result);
  } finally {
    await client.close();
  }
}

const query = process.argv[2] || 'defaultQuery';
runSearch(query).catch(console.dir);
