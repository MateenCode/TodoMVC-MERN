const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const todoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  complete: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Todo = mongoose.model("todo", todoSchema);
