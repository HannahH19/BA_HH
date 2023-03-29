const express = require("express");
const db = require("./config/db");
const cors = require("cors");

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

// Route to get all posts
app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM beitrag", (err, result) => {
    if (err) {
      console.log("123");
      console.log(err);
    }
    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

db.connect((err) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log("it worked to MYSQL");
  console.log(err);
});
