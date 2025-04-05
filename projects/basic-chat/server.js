import express from "express";
import http from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const __dirname = dirname(fileURLToPath(import.meta.url));
app.get("/", (req, res) =>
  res.sendFile(join(__dirname, "./public/index.html"))
);

io.on("connection", (client) => {
  console.log(`user ${client.id} is connected`);

  client.emit("message", "Hello this message come from server");

  client.on("message", (msg) => {
    io.emit("message", `${msg}`);
  });

  client.on("disconnect", () => {
    console.log(`user ${client.id} is disconnected`);
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
