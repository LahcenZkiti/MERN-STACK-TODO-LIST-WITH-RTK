const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create schema for Todo List
const TodoSchema = new Schema({
  title: { type: String, required: [true, 'The todo text field is required'] },
  isCompleted:{ type:Boolean, default: false }
}, { timestamps: true }
)



module.exports = mongoose.model('todo', TodoSchema);