const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const profitSocket = require("./src/profitSocket");
const store = require("./src/store");
const metaApi = require("./src/metaApi");
const config = require("dotenv").config();

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

store.new();
profitSocket.new(server);

if (config.METATRADER_API_TOKEN && config.METATRADER_API_ACCOUNT_ID) {
  metaApi.connect();
}
