const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/companyScraper';
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
module.exports = connectDB;
