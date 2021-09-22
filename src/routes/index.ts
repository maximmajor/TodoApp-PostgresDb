import express from "express";
import Todo from "../models/todo";
const router = express.Router();
const _ = require("lodash");
//import Todo from "../models/todo"
import auth from "../middleware/auth";

/* GET home page. */
router.get("/", function (req: express.Request, res: express.Response, _next) {
  //res.render('index', { title: 'Express' });
  res.redirect("/todos");
});

router.get(
  "/about",
  auth,
  function (req: express.Request, res: express.Response, _next) {
    res.render("about", { title: "About" });
  }
);

router.get(
  "/todos/create",
  auth,
  function (req: express.Request, res: express.Response, _next) {
    res.render("create", { title: "Create a new todo" });
  }
);

router.get(
  "/todos",
  function (req: express.Request, res: express.Response, _next) {
    //res.render('index', { title: 'Express' });
    //res.redirect('/todos');
    Todo.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        res.render("index", { todos: result, title: "All todos" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

router.post(
  "/todos",
  auth,
  function (req: express.Request, res: express.Response, _next) {
    // console.log(req.body);
    const todo = new Todo(req.body);
    todo
      .save()
      .then((result: any) => {
        res.redirect("/todos");
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
);

router.get(
  "/todos/:id",
  auth,
  function (req: express.Request, res: express.Response, _next) {
    // console.log(req.body);
    const id = req.params.id;
    Todo.findById(id)
      .then((result) => {
        res.render("details", { todo: result, title: "todo Details" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

router.post(
  "/update/:id",
  auth,
  async function (req: express.Request, res: express.Response, _next) {
    Todo.findById(
      req.params.id,
      function (
        err: any,
        todo: {
          title: any;
          snippet: any;
          body: any;
          save: (arg0: (err: any, todo: any, count: any) => void) => void;
        }
      ) {
        todo.title = req.body.title;
        todo.snippet = req.body.snippet;
        todo.body = req.body.body;
        todo.save(function (err: any, todo: any, count: any) {
          res.redirect("/todos");
        });
      }
    );
  }
);

router.get(
  "/updates/:id",
  auth,
  function (req: express.Request, res: express.Response, _next) {
    const id = req.params.id;
    Todo.findById(id)
      .then((result) => {
        res.render("update", { todo: result, title: "todo Details" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

router.delete(
  "/todos/:id",
  auth,
  function (req: express.Request, res: express.Response, _next) {
    const id = req.params.id;

    Todo.findByIdAndDelete(id)
      .then((result) => {
        res.json({ redirect: "/todos" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export default router;
