const mongoose = require('mongoose');
require('dotenv').config();    // to load all the .env variables


//const mongoURI = process.env.DB_URL;
//console.log(mongoURI)
const mongoURI = 'mongodb://127.0.0.1:27017/inotebook'
const connectToMongo = async () => {
  try {
    mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
  }
};

module.exports = connectToMongo;
