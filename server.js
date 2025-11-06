const express = require("express"); // create express server. handle the http
const mysql = require("mysql2"); // connect mysql
const cors = require("cors"); // to communicte the client side to server side
const bodyParser = require("body-parser"); // to convert data into js onject
const bcrypt = require("bcrypt"); // hash password
const path = require("path");

const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

//database connection
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

//default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Missing field" });

  const loginQuery = "SELECT * FROM users WHERE username = ?";
  db.query(loginQuery, [username], async (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (result.length === 0) {
      return res.status(401).json({ error: "Inavalid username and password" });
    }
    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username and password" });
    }

    res.status(200).json({ message: "Login successfull", user: result[0] });
  });
});

//register route
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Missing field" });

  const strongPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!strongPassword.test(password)) {
    return res.status(400).json({
      error:
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
    });
  }

  const checkQuery = "SELECT * FROM users WHERE username = ?";
  db.query(checkQuery, [username], async (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (result.length > 0) {
      return res.status(400).json({ error: "Email already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(insertQuery, [username, hashedPassword], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Database error" });
      }

      res.json({ message: "Registered successfully" });
    });
  });
});

app.listen(5000, () => {
  console.log("Server running port 5000");
});
