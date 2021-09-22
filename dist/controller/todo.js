"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.postTodo = exports.updateTodo = exports.gettodo = exports.getTodoById = void 0;
const todo_1 = __importDefault(require("../models/todo"));
// get todos byID
async function getTodoById(id) {
    const individualTodo = await todo_1.default.findById(id);
    return individualTodo;
}
exports.getTodoById = getTodoById;
// to get all todos
async function gettodo() {
    const data = await todo_1.default.find().sort({ createdAt: -1 });
    return data;
}
exports.gettodo = gettodo;
//Update by id
async function updateTodo(id, title, snippet, body) {
    try {
        const updateTodo = { title, snippet, body };
        return await todo_1.default.findByIdAndUpdate(id, updateTodo, { new: true });
    }
    catch (err) {
        throw err;
    }
}
exports.updateTodo = updateTodo;
//create todo
async function postTodo(title, snippet, body) {
    try {
        const postTodo = { title, snippet, body };
        return await todo_1.default.create(postTodo);
    }
    catch (err) {
        throw err;
    }
}
exports.postTodo = postTodo;
// Delete todo
async function deleteTodo(id) {
    try {
        return await todo_1.default.findByIdAndDelete(id);
    }
    catch (err) {
        throw err;
    }
}
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=todo.js.map