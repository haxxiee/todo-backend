const http = require("http");
const { getAllTodos, getSingelTodo } = require("./controllers/controllers");

let data = require("./data/data.json");

const server = http.createServer((req, res) => {
  if (req.url === "/todos" && req.method === "GET") {
    getAllTodos(res);
  } else if (req.url.match(/\/todos\/([0-9]+)/) && req.method == "GET") {
    const id = parseInt(req.url.split("/")[2]);
    getSingelTodo(res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => console.log(`Server is running! PORT: ${PORT}`));
