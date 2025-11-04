const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "bank_system",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySql Connected!");
});

//register route

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Missing field" });

  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    (err) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ message: "Registered successfully" });
    }
  );
});

app.listen(5000, () => {
  console.log("Server running port 5000");
});
