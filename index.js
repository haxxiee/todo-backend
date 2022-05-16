const http = require("http");
const data = require("./data/data.json");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data.todos));
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => console.log(`Server is running! PORT: ${PORT}`));
