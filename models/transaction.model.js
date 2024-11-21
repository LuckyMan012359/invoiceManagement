const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Post Schema
 */
const transactionSchema = new Schema({
  author: {
    type: Number,
    required: [true, 'Author not provided'],
  },
  title: {
    type: String,
    reuqired: [true, 'Title not provided'],
    unique: [true, 'Title already exists in database!'],
  },
  isPublished: {
    type: Boolean,
    require: [false, 'Published not provied'],
  },
  timestamp: {
    type: Number,
    default: Date.now,
  },
  publishedDate: {
    type: Number,
    default: null,
  },
});

module.exports = mongoose.model('transaction', transactionSchema);
