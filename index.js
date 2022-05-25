const http = require("http");
const {
  getAllTodos,
  getSingelTodo,
  createTodo,
  deleteTodo,
  updateTodo,
  updatePatchTodo,
} = require("./controllers/controllers");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  // res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  // res.setHeader(
  //   "Access-Control-Allow-Headers",
  //   "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  // );

  if (req.url === "/todos" && req.method === "GET") {
    getAllTodos(res);
  } else if (req.url.match(/\/todos\/([0-9]+)/) && req.method == "GET") {
    const id = parseInt(req.url.split("/")[2]);
    getSingelTodo(res, id);
  } else if (req.url === "/todos" && req.method === "POST") {
    createTodo(req, res);
  } else if (req.url.match(/\/todos\/([0-9]+)/) && req.method == "PATCH") {
    const id = parseInt(req.url.split("/")[2]);
    updatePatchTodo(req, res, id);
  } else if (req.url.match(/\/todos\/([0-9]+)/) && req.method == "PUT") {
    const id = parseInt(req.url.split("/")[2]);
    updateTodo(req, res, id);
  } else if (req.url.match(/\/todos\/([0-9]+)/) && req.method == "DELETE") {
    const id = parseInt(req.url.split("/")[2]);
    deleteTodo(res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Does Not Exist" }));
  }
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => console.log(`Server is running! PORT: ${PORT}`));
