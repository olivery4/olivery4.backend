const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow requests from anywhere
app.use(bodyParser.json()); // Parse JSON bodies

// Example POST endpoint (e.g. to handle form submissions)
app.post('/submit', (req, res) => {
  const data = req.body;
  console.log('Form data received:', data);

  // Respond with success
  res.status(200).json({ message: 'Form submitted successfully!' });
});

// Example GET route (optional)
app.get('/', (req, res) => {
  res.send('Hello from your backend!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
