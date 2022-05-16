const { findTodo } = require("../functions/functions");
let data = require("../data/data.json");

function getAllTodos(res) {
  try {
    const todos = data.todos;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todos));
  } catch (err) {
    console.log(err);
  }
}

function getSingelTodo(res, id) {
  try {
    const todo = findTodo(id);
    if (!todo) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(todo));
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllTodos,
  getSingelTodo,
};
