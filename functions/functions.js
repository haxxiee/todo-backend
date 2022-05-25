const fs = require("fs");

function findTodo(id) {
  return loadData().todos.find((todo) => todo.id === id);
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

function update(id, todo) {
  const jsonData = loadData();
  const index = jsonData.todos.findIndex((t) => t.id === id);
  jsonData.todos[index] = { id, ...todo };
  console.log(jsonData);
  writeToFile(jsonData);
}

module.exports = {
  findTodo,
  createId,
  writeToFile,
  loadData,
  update,
};
