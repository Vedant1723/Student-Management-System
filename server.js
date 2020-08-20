const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Connect to Database
connectDB();

app.get("/", (req, res) => {
  res.send("API is Running");
});

// Initiating Middleware
app.use(express.json({ extended: false }));

//Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/students", require("./routes/api/students"));
app.use("/api/auth", require("./routes/api/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server Running on ", PORT);
});
