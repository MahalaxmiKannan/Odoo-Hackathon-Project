const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("AssetFlow Backend Running");
});

module.exports = app;