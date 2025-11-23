const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Temporary patient register route (to test in Postman)
app.post("/api/patients/register", (req, res) => {
  const { name, age, gender } = req.body;

  if (!name || !age || !gender) {
    return res.status(400).json({ message: "All fields are required" });
  }

  res.status(200).json({
    message: "Patient registered successfully",
    data: { name, age, gender }
  });
});

// Base route
app.get("/", (req, res) => {
  res.send("Hospital API running...");
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
