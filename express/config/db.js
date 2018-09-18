
// Set up DB connection.
const mysql = require('mysql');
const db = mysql.createConnection({
  socketPath: process.env.db_socketPath,
  host: process.env.db_host,
  port: process.env.db_port,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_database
});

db.connect(function(err) {
  if (err) throw err;
});

module.exports = db;