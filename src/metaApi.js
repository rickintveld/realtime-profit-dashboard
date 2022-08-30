const client = require("socket.io-client");
const uuid = require("uuid");
const config = require("dotenv").config();

module.exports = {
  connect: () => {
    const socket = client(config.METATRADER_API_URI, {
      path: "/ws",
      reconnection: false,
      query: {
        "auth-token": config.METATRADER_API_TOKEN,
      },
    });

    const request = {
      accountId: config.METATRADER_API_ACCOUNT_ID,
      type: "synchronize",
      requestId: uuid.v4(),
      startingDealTime: "2022-08-28T00:00:00.000Z",
      startingHistoryOrderTime: "2022-08-28T00:00:00.000Z",
    };

    socket.on("connect", () => {
      socket.emit("request", request);
    });

    socket.on("synchronization", (data) => {
      console.log(data);
      if (data.type === "authenticated") {
        socket.emit("add_profit", data.positions[0]);
      }
    });

    socket.on("processingError", (err) => {
      console.error(err);
    });
  },
};
