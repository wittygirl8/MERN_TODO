const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    user_id:{ type: String, required: true},
    task_name:{ type: String, required: true},
  });

  module.exports = mongoose.model('TODO', todoSchema);
