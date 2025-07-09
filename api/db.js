// db.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://2021cs125:KtkkC4ecZf0mUZsO@cluster0.fbgcbfs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // 🔁 use your real URI
const client = new MongoClient(uri);
let db;

async function connectToDB() {
  try {
    await client.connect();
    db = client.db('social_network');
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
  }
}

function getDB() {
  return db;
}

module.exports = { connectToDB, getDB };
