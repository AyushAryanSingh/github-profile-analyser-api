const express = require("express");
const profileRoutes = require("./routes/profileRoutes");
const app = express();
app.use(express.json());

app.use("/api/profiles", profileRoutes);

module.exports = app;