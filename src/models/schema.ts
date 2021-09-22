import { getTodoById, gettodo,  updateTodo, postTodo, deleteTodo} from "../controller/todo"
import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLArgumentConfig,
} from "graphql";


const Todotype = new GraphQLObjectType({
  name: "todoApp",
  description: "TODO APP API",
  fields: () => ({
    id: {
      type: GraphQLID,
      description: "The identifier for the student",
    },
    title: {
      type: GraphQLString,
      description: "enter title",
    },
    snippet: {
      type: GraphQLString,
      description: "enter snippet",
    },
    body: {
      type: GraphQLString,
      description: "enter body",
    },
  }),
});


const query = new GraphQLObjectType({
  name: "RootQuery",
  description: "The root query",
  fields: () => ({
    getAlltodos: {
      type: new GraphQLList(Todotype),
      description: "ALL MY TODOS",
      resolve: () => gettodo(),
    },

    getTodoByID: {
      type: Todotype,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: "The ID of the todolist to query for",
        },
      },
      resolve: (_, args: any) => {
        //console.log(args)
        return getTodoById(args.id);
      },
    },
  }),
});

const mutation = new GraphQLObjectType({
  name: "mutation",
  description: "Make Changes to the Todo schema",
  fields: () => ({
    updateTodo: {
      type: Todotype,
      description: "Updates todos with their given id",
      args: {
        todoId: {
          type: new GraphQLNonNull(GraphQLID),
          description: "The Id of the todo to be updated",
        },
        title: {
          type: new GraphQLNonNull(GraphQLString),
          description: "What the new title of the todo should be",
        },
        snippet: {
          type: new GraphQLNonNull(GraphQLString),
          description: "What the new snippet of the todo should be",
        },
        body: {
          type: new GraphQLNonNull(GraphQLString),
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
          type: new GraphQLNonNull(GraphQLString),
          description: "What the new title of the todo should be",
        },
        snippet: {
          type: new GraphQLNonNull(GraphQLString),
          description: "What the new snippet of the todo should be",
        },
        body: {
          type: new GraphQLNonNull(GraphQLString),
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
          type: new GraphQLNonNull(GraphQLID),
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

const schema = new GraphQLSchema({
  query,
  mutation,
});

export default schema;
