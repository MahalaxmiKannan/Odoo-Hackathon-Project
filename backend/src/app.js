const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Default Route
app.get("/", (req, res) => {
  res.send("AssetFlow Backend Running");
});

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/departments", require("./routes/department.routes"));
app.use("/api/categories", require("./routes/category.routes"));
app.use("/api/employees", require("./routes/employee.routes"));
app.use("/api/assets", require("./routes/asset.routes"));
app.use("/api/allocations", require("./routes/allocation.routes"));
app.use(
  "/api/dashboard",
  require("./routes/dashboard.routes")
);
app.use(
  "/api/notifications",
  require("./routes/notification.routes")
);

module.exports = app;