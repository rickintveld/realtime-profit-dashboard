const ioClient = require("socket.io-client");
const socket = ioClient("http://localhost:3000/");
const prompt = require("prompt");

let profit = {
  type: "",
  symbol: "",
  openPrice: 0,
  takeProfit: 0,
  stopLoss: 0,
  lotSize: 0,
  commission: 0,
  profit: 0,
};

const schema = {
  properties: {
    type: {
      type: "string",
      required: true,
    },
    symbol: {
      type: "string",
      required: true,
    },
    openPrice: {
      type: "number",
      required: true,
    },
    stopLoss: {
      type: "number",
      required: true,
    },
    takeProfit: {
      type: "number",
      required: true,
    },
    lotSize: {
      type: "number",
      required: true,
    },
    commission: {
      type: "number",
      required: true,
    },
    profit: {
      type: "number",
      required: true,
    },
  },
};

prompt.start();

prompt.get(schema, function (err, result) {
  profit = {
    ...result,
    time: new Date().toISOString(),
  };

  if (!err) {
    console.log("Sending new profit..:", profit);
    socket.emit("add_profit", profit);
  }
});
