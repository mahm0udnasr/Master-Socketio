import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

io.on("connection", (client) => {
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
