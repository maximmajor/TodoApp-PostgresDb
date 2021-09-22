"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_1 = __importDefault(require("./models/todo"));
const graphql_1 = require("graphql");
const Todotype = new graphql_1.GraphQLObjectType({
    name: "todoApp",
    description: "TODO APP API",
    fields: () => ({
        id: {
            type: graphql_1.GraphQLID,
            description: "The identifier for the student",
        },
        title: {
            type: graphql_1.GraphQLString,
            description: "enter title",
        },
        snippet: {
            type: graphql_1.GraphQLString,
            description: "enter snippet",
        },
        body: {
            type: graphql_1.GraphQLString,
            description: "enter body",
        },
    }),
});
// get todos byID
async function getTodoBy(id) {
    const individualTodo = await todo_1.default.findById(id);
    return individualTodo;
}
// to get all todos
async function gettodo() {
    const data = await todo_1.default.find().sort({ createdAt: -1 });
    return data;
}
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
// Delete todo
async function deleteTodo(id) {
    try {
        return await todo_1.default.findByIdAndDelete(id);
    }
    catch (err) {
        throw err;
    }
}
const query = new graphql_1.GraphQLObjectType({
    name: "RootQuery",
    description: "The root query",
    fields: () => ({
        getAlltodos: {
            type: new graphql_1.GraphQLList(Todotype),
            description: "ALL MY TODOS",
            resolve: () => gettodo(),
        },
        getTodoByID: {
            type: Todotype,
            args: {
                id: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
                    description: "The ID of the todolist to query for",
                },
            },
            resolve: (_, args) => {
                //console.log(args)
                return getTodoBy(args.id);
            },
        },
    }),
});
const mutation = new graphql_1.GraphQLObjectType({
    name: "mutation",
    description: "Make Changes to the Todo schema",
    fields: () => ({
        updateTodo: {
            type: Todotype,
            description: "Updates todos with their given id",
            args: {
                todoId: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
                    description: "The Id of the todo to be updated",
                },
                title: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                    description: "What the new title of the todo should be",
                },
                snippet: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                    description: "What the new snippet of the todo should be",
                },
                body: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                    description: "What the new body of the todo should be",
                },
            },
            resolve: (_, args) => {
                const { todoId, title, snippet, body } = args;
                return updateTodo(todoId, title, snippet, body);
            },
        },
        postTodo: {
            type: Todotype,
            description: "Create new todo",
            args: {
                title: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                    description: "What the new title of the todo should be",
                },
                snippet: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                    description: "What the new snippet of the todo should be",
                },
                body: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                    description: "What the new body of the todo should be",
                },
            },
            resolve: (_, args) => {
                const { title, snippet, body } = args;
                return postTodo(title, snippet, body);
            },
        },
        deleteTodo: {
            type: Todotype,
            description: "To Delete existing todo",
            args: {
                todoId: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
                    description: "Delete by ID",
                },
            },
            resolve: (_, args) => {
                const { todoId } = args;
                return deleteTodo(todoId);
            },
        },
    }),
});
const schema = new graphql_1.GraphQLSchema({
    query,
    mutation,
});
exports.default = schema;
//# sourceMappingURL=schema.js.map