// db.js
const mongoose = require('mongoose');

const DB_NAME = "olympics_quiz_2024"

const url = 'mongodb://127.0.0.1:27017/' + DB_NAME;

mongoose.connect(url);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
