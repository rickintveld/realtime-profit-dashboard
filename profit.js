const ioClient = require("socket.io-client");
const socket = ioClient("http://localhost:3000/");

socket.emit("add_profit", {
  type: "SELL",
  symbol: "GBP/USD",
  openPrice: 1.23293,
  takeProfit: 1.23193,
  stopLoss: 1.23193,
  lotSize: 1.233,
  commission: 15,
  profit: 1000,
});
