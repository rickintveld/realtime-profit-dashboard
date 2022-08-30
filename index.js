const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const profitSocket = require("./src/profitSocket");
const store = require("./src/store");
const metaApi = require("./src/metaApi");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

store.new();
profitSocket.new(server);
metaApi.connect();
