const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());

const dbHost = process.env.DB_HOST || 'mongodb';
const dbPort = process.env.DB_PORT || 27017;
const dbName = process.env.DB_NAME || 'todo';
const mongoUri = `mongodb://${dbHost}:${dbPort}/${dbName}`;

const client = new MongoClient(mongoUri);
let db;

async function runDb() {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
}

app.get('/todos', async (req, res) => {
  const todos = await db.collection('todos').find().toArray();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const todo = { text: req.body.text, completed: false };
  await db.collection('todos').insertOne(todo);
  res.status(201).json(todo);
});

app.listen(3000, async () => {
  await runDb();
  console.log('Server running on port 3000');
});