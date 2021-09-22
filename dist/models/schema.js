"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_1 = require("../controller/todo");
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
const query = new graphql_1.GraphQLObjectType({
    name: "RootQuery",
    description: "The root query",
    fields: () => ({
        getAlltodos: {
            type: new graphql_1.GraphQLList(Todotype),
            description: "ALL MY TODOS",
            resolve: () => (0, todo_1.gettodo)(),
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
                return (0, todo_1.getTodoById)(args.id);
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
                return (0, todo_1.updateTodo)(todoId, title, snippet, body);
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
                return (0, todo_1.postTodo)(title, snippet, body);
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
                return (0, todo_1.deleteTodo)(todoId);
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