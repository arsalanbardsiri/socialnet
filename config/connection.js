const mongoose = require('mongoose');

// Use the MongoDB URI from the environment variable or fallback to the local database for development
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialmedia';

// An asynchronous function to connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Successfully connected to MongoDB at URI: ${mongoURI}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Connect to MongoDB when the file is loaded
connectToDatabase();

// Export the Mongoose connection
module.exports = mongoose.connection;
