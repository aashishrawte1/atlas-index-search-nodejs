const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://anqunix:anqunix@cluster0.npcl0ll.mongodb.net';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// const provincesData = [
//   { province: "Alberta", capital: "Edmonton" },
//   { province: "British Columbia", capital: "Victoria" },
//   { province: "Manitoba", capital: "Winnipeg" },
//   { province: "New Brunswick", capital: "Fredericton" },
//   { province: "Newfoundland and Labrador", capital: "St. John's" },
//   { province: "Nova Scotia", capital: "Halifax" },
//   { province: "Ontario", capital: "Toronto" },
//   { province: "Prince Edward Island", capital: "Charlottetown" },
//   { province: "Quebec", capital: "Quebec City" },
//   { province: "Saskatchewan", capital: "Regina" },
//   { province: "Northwest Territories", capital: "Yellowknife" },
//   { province: "Nunavut", capital: "Iqaluit" },
//   { province: "Yukon", capital: "Whitehorse" }
// ];

const data = [
    {"name": "M.R. PARENT INC."},
    {"name": "COLLEGE DE MONT-ROYAL"},
    {"name": "Paysage Béton Inc"},
    {"name": "Tania Filion-Perreault"},
    {"name": "9431-8979 Québec Inc"},
    {"name": "Transport RL Bédard inc"},
    {"name": "DIESEL-BEC INC"}
]

async function insertProvincesData() {
  try {
    await client.connect();
    const database = client.db('sampleData');
    const collection = database.collection('samples');

    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents inserted.`);

  } catch (err) {
    console.error('Error inserting documents:', err);
  } finally {
    await client.close();
  }
}

insertProvincesData().catch(console.error);
