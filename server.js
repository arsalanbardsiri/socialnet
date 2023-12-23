const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Define the port to run the server on
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Middleware for parsing application/json
app.use(express.json());
// Use the defined routes for the application
app.use(routes);

// Start the server once the database connection is open
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

// Export the Express application
module.exports = app;
