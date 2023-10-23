const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema({
  boy: Number,
  girl: Number,
  male: Number,
  female: Number,
});

const People = mongoose.model('People', peopleSchema);

module.exports = People;
