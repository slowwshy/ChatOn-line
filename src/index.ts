import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("message", (msg: { user: string; text: string }) => {
    io.emit("message", { ...msg, at: Date.now() });
  });
});

app.get("/", (req, res) => {
  res.send("Servidor rodando");
});

httpServer.listen(3000, () => console.log("rodando na :3000"));