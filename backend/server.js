const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./database'); // Import the connectDB function
const routes = require('./routes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
