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

// 19-09 14:00
// 1. paspoort
// 2. toestemming van inwoning
// 3. copy van ouders
// 4. copy koop contract
// 5. formulier adres wijziging
// 6. formulier hervestiging

// 722868
