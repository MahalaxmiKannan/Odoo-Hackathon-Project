const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));

// Test Route
app.get("/", (req, res) => {
  res.send("AssetFlow Backend Running");
});

module.exports = app;