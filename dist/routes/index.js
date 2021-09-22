"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_1 = __importDefault(require("../models/todo"));
const router = express_1.default.Router();
const _ = require("lodash");
//import Todo from "../models/todo"
const auth_1 = __importDefault(require("../middleware/auth"));
/* GET home page. */
router.get("/", function (req, res, _next) {
    //res.render('index', { title: 'Express' });
    res.redirect("/todos");
});
router.get("/about", auth_1.default, function (req, res, _next) {
    res.render("about", { title: "About" });
});
router.get("/todos/create", auth_1.default, function (req, res, _next) {
    res.render("create", { title: "Create a new todo" });
});
router.get("/todos", function (req, res, _next) {
    //res.render('index', { title: 'Express' });
    //res.redirect('/todos');
    todo_1.default.find()
        .sort({ createdAt: -1 })
        .then((result) => {
        res.render("index", { todos: result, title: "All todos" });
    })
        .catch((err) => {
        console.log(err);
    });
});
router.post("/todos", auth_1.default, function (req, res, _next) {
    // console.log(req.body);
    const todo = new todo_1.default(req.body);
    todo
        .save()
        .then((result) => {
        res.redirect("/todos");
    })
        .catch((err) => {
        console.log(err);
    });
});
router.get("/todos/:id", auth_1.default, function (req, res, _next) {
    // console.log(req.body);
    const id = req.params.id;
    todo_1.default.findById(id)
        .then((result) => {
        res.render("details", { todo: result, title: "todo Details" });
    })
        .catch((err) => {
        console.log(err);
    });
});
router.post("/update/:id", auth_1.default, async function (req, res, _next) {
    todo_1.default.findById(req.params.id, function (err, todo) {
        todo.title = req.body.title;
        todo.snippet = req.body.snippet;
        todo.body = req.body.body;
        todo.save(function (err, todo, count) {
            res.redirect("/todos");
        });
    });
});
router.get("/updates/:id", auth_1.default, function (req, res, _next) {
    const id = req.params.id;
    todo_1.default.findById(id)
        .then((result) => {
        res.render("update", { todo: result, title: "todo Details" });
    })
        .catch((err) => {
        console.log(err);
    });
});
router.delete("/todos/:id", auth_1.default, function (req, res, _next) {
    const id = req.params.id;
    todo_1.default.findByIdAndDelete(id)
        .then((result) => {
        res.json({ redirect: "/todos" });
    })
        .catch((err) => {
        console.log(err);
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map