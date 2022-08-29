const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const { Store } = require("fs-json-store");
const store = new Store({ file: "data.json" });
store.write([]);

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("Connected");

  socket.on("profits", async (data) => {
    const profits = await store.read();
    io.emit("profits", profits);
  });

  socket.on("add_profit", async (profit) => {
    io.emit("add_profit", profit);
    const profits = await store.read();
    store.write([...profits, profit]);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
