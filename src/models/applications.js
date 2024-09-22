const mongoose = require('mongoose');

// Create a Applications Schema
const applicationsSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true
  },
  cover_latter: {
    type: String,
    required: true
  },
  resume_url: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Create a model from a diagram
const Applications = mongoose.model('Applications', applicationsSchema);

module.exports = Applications;
