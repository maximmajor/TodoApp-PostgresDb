import Todo from "../models/todo";

// get todos byID
export async function getTodoById(id: any) {
  const individualTodo = await Todo.findById(id);
  return individualTodo;
}

// to get all todos
export async function gettodo() {
  const data = await Todo.find().sort({ createdAt: -1 });
  return data;
}

//Update by id
export async function updateTodo(
  id: String,
  title: String,
  snippet: String,
  body: String
) {
  try {
    const updateTodo = { title, snippet, body };
    return await Todo.findByIdAndUpdate(id, updateTodo, { new: true });
  } catch (err) {
    throw err;
  }
}

//create todo
export async function postTodo(title: String, snippet: String, body: String) {
  try {
    const postTodo = { title, snippet, body };
    return await Todo.create(postTodo);
  } catch (err) {
    throw err;
  }
}

// Delete todo
export async function deleteTodo(id: string) {
  try {
    return await Todo.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
}
