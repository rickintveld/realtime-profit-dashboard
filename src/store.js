const { Store } = require("fs-json-store");

module.exports = {
  new: async () => {
    const store = new Store({ file: "data.json" });
    const data = await store.read();

    if (!data) {
      store.write([]);
    }
  },
  get: () => {
    return new Store({ file: "data.json" });
  },
};
