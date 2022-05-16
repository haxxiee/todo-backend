let data = require("../data/data.json");

function findTodo(id) {
  return data.todos.find((todo) => todo.id === id);
}

module.exports = {
  findTodo,
};
