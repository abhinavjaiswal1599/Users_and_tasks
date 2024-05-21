const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subtaskSchema = new Schema({
  subject: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, required: true },
  deleted: { type: Boolean, default: false } // Change from isDeleted to deleted
});

module.exports = mongoose.model('Subtask', subtaskSchema);

