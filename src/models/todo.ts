import mongoose from 'mongoose';


const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;