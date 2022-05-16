const {
  findTodo,
  createId,
  writeToFile,
  loadData,
} = require("../functions/functions");

function getAllTodos(res) {
  try {
    const todos = loadData().todos;

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
      res.end(JSON.stringify({ message: "Todo Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(todo));
    }
  } catch (err) {
    console.log(err);
  }
}

function createTodo(req, res) {
  try {
    req.on("data", (chunk) => {
      const chunkData = chunk.toString();
      let newTodo = {
        id: createId(),
        ...JSON.parse(chunkData),
        completed: false,
      };
      const jsonData = loadData();

      jsonData.todos.push(newTodo);
      writeToFile(jsonData);
    });

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Successfully Created!" }));
  } catch (err) {
    console.log(err);
  }
}

function deleteTodo(res, id) {
  try {
    const todo = findTodo(id);

    if (!todo) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Todo Not Found" }));
    } else {
      const newData = loadData().todos.filter((todo) => todo.id !== id);
      const jsonData = {
        todos: newData,
      };

      writeToFile(jsonData);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Successfully Deleted!" }));
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllTodos,
  getSingelTodo,
  createTodo,
  deleteTodo,
};
