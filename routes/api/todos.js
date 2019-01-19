const express = require("express");
const router = express.Router();

// Item Model
const Todo = require("../../models/Todo");

// @route   GET api/todos
// @desc    Get All Todos
// @access  Public
router.get("/", (req, res) => {
  Todo.find()
    .sort({ date: -1 })
    .then(todo => res.json(todo));
});

// @route   POST api/todos
// @desc    Create An Todo
// @access  Public
router.post("/", (req, res) => {
  const newTodo = new Todo({
    title: req.body.title
  });

  newTodo.save().then(todo => res.json(todo));
});

// @route   Post api/todos/all
// @desc    remove All completed Todo
// @access  Public
router.post("/all", (req, res) => {
  Todo.deleteMany({
    complete: true
  })
    .then(() => res.json({ success: true }))
    .catch(() => res.status(404).json({ success: false }));
});

// @route   DELETE api/todos/:id
// @desc    Delete A Todo
// @access  Public
router.delete("/:id", (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => todo.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   PATCH api/todos/:id
// @desc    toggle change complete to false
// @access  Public
router.patch("/:id", (req, res) => {
  Todo.findById(req.params.id).then(todo => {
    todo.complete = !todo.complete;
    todo.save().then(() => res.json({ success: true }));
  });
});

module.exports = router;
