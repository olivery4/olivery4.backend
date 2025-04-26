const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST endpoint to handle form submissions
app.post('/submit', (req, res) => {
  const data = req.body;
  saveData(data);
  console.log('Form data received:', data);
  res.json({ message: "Form submitted and saved!" });
});

// Save data to local JSON file
function saveData(data) {
  const filePath = path.join(__dirname, 'data.json');

  fs.readFile(filePath, 'utf8', (err, fileData) => {
    let existingData = [];

    if (!err && fileData) {
      try {
        existingData = JSON.parse(fileData);
      } catch (e) {
        console.error('Invalid JSON in file:', e);
      }
    }

    existingData.push(data);

    fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (err) => {
      if (err) {
        console.error('Failed to save data:', err);
      } else {
        console.log('Data successfully saved!');
      }
    });
  });
}

app.get('/submissions', (req, res) => {
  const password = req.headers["password"];

  if (password !== process.env.Password) {
    return res.status(401).send('Unauthorized');
  }
  
  const filePath = path.join(__dirname, 'data.json');
  
  fs.readFile(filePath, 'utf8', (err, fileData) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Server error');
    }

    try {
      const data = JSON.parse(fileData);
      res.json(data); // Send the array as JSON
    } catch (e) {
      console.error('Error parsing JSON:', e);
      res.status(500).send('Invalid data format');
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
