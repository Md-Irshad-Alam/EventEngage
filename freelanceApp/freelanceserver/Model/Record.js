const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
