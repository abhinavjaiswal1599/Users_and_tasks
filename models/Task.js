const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  subject: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, required: true },
  subtasks: [{ type: Schema.Types.ObjectId, ref: 'Subtask' }],
  deleted: { type: Boolean, default: false } // Change from isDeleted to deleted
});

module.exports = mongoose.model('Task', taskSchema);

