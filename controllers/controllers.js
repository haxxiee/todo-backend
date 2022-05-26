const url = require("url");

const {
  findTodo,
  createId,
  writeToFile,
  loadData,
  update,
} = require("../functions/functions");
const { rejects } = require("assert");

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
      console.log(JSON.parse(chunkData));

      const jsonData = loadData();

      jsonData.todos.push(newTodo);
      writeToFile(jsonData);
    });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Successfully Created!" }));
  } catch (err) {
    console.log(err);
  }
}

function updateTodo(req, res, id) {
  try {
    const todo = findTodo(id);
    if (!todo) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Todo Not Found" }));
    } else {
      req.on("data", (chunk) => {
        const chunkData = chunk.toString();
        let updatedTodo = {
          todo: JSON.parse(chunkData).todo,
          completed: JSON.parse(chunkData).completed,
        };

        update(id, updatedTodo);
      });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Successfully updated" }));
    }
  } catch (err) {
    console.log(err);
  }
}

function updatePatchTodo(req, res, id) {
  try {
    const todo = findTodo(id);
    if (!todo) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Todo Not Found" }));
    } else {
      req.on("data", (chunk) => {
        const chunkData = chunk.toString();

        let updatedTodo = {
          todo: JSON.parse(chunkData).todo || todo.todo,
          completed: JSON.parse(chunkData).completed || todo.completed,
        };

        if (JSON.parse(chunkData).completed !== undefined) {
          updatedTodo.completed = JSON.parse(chunkData).completed;
        }

        update(id, updatedTodo);
      });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Successfully updated" }));
    }
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
  updateTodo,
  updatePatchTodo,
};
