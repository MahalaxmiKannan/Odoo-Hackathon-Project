const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", require("./routes/auth.routes"));

app.use(
  "/api/departments",
  require("./routes/department.routes")
);

app.use(
  "/api/categories",
  require("./routes/category.routes")
);

app.use(
  "/api/employees",
  require("./routes/employee.routes")
);

// Assets Route
app.use(
  "/api/assets",
  require("./routes/asset.routes")
);

// Health Check
app.get("/", (req, res) => {
  res.send("🚀 AssetFlow Backend Running");
});

module.exports = app;