const { Server } = require("socket.io");
const store = require("./store");

module.exports = {
  new: (server) => {
    const dataStore = store.get();
    const io = new Server(server);

    io.on("connection", (socket) => {
      console.log("Connected");

      socket.on("profits", async (data) => {
        const profits = await dataStore.read();
        io.emit("profits", profits);
      });

      socket.on("add_profit", async (profit) => {
        console.log("Incoming profit:", profit);

        io.emit("add_profit", profit);

        const profits = await dataStore.read();
        dataStore.write([...profits, profit]);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });

    server.listen(3000, () => {
      console.log("listening on *:3000");
    });
  },
};
