const path = require("node:path");

module.exports = {
  mode: "development",
  entry: "./ex05/src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
