const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root_test",
  password: "",
  database: "intranet",
});

module.exports = db;
