// importo mysql2
const mysql = require('mysql2');

// creo la connessione al db
const connection = mysql.createConnection({
  host: "",
  port: "",
  user: "",
  password: "",
  database: ""
});

// effettuo la connessione
connection.connect((err) => {
  if (err) {
    console.log("Error to connect to MySQL: " + err);
  } else {
    console.log("Connected to MYSQL");
  }
});

// esporto la variabile connection
module.exports = connection;