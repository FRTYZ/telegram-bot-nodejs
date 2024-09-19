const mongoose = require('mongoose');

// Create a Applications Schema
const applicationsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Create a model from a diagram
const Applications = mongoose.model('Applications', applicationsSchema);

module.exports = Applications;
