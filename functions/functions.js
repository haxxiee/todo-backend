const fs = require("fs");
let data = require("../data/data.json");

function findTodo(id) {
  return data.todos.find((todo) => todo.id === id);
}

function createId() {
  return Date.now();
}

function writeToFile(data) {
  const dataJSON = JSON.stringify(data);
  fs.writeFile("./data/data.json", dataJSON, (err) => {
    if (err) throw err;
    console.log("File successfully written!");
  });
}

function loadData() {
  const dataBuffer = fs.readFileSync("./data/data.json");
  const dataJSON = dataBuffer.toString();
  return JSON.parse(dataJSON);
}

module.exports = {
  findTodo,
  createId,
  writeToFile,
  loadData,
};
