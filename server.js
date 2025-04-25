const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow requests from anywhere
app.use(bodyParser.json()); // Parse JSON bodies

// Example POST endpoint (e.g. to handle form submissions)
app.post('/submit', (req, res) => {
  const data = req.body;
  saveData(data);
  console.log('Form data received:', data);
});

async function saveData(data) {
  const client = new MongoClient("mongodb://localhost:27017");
  
  try {
    await client.connect();

    const dataBase = client.db("olivery4Data");
    const collection = dataBase.collection("formData");

    const result = await collection.insertOne({ data: data });

    console.log("data saved: ", result);
    console.log("collection: ", collection);
  } catch (error) {
    console.log("error: ", error);
  } finally {
    await client.close();
  }
  
};

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
