//Fill .env first with the IP of the database host, database login username and password, database name,

//dotenv is used to read EXPORT strings from .env files, mysql package is used to connect with the database
require('dotenv').config();
const mysql = require('mysql');

//Connect to database
let devDBConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});

//Check if connected or not
devDBConnection.connect(function(err) {
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
      return;
    }
    console.log('The database is connected! Thread ID: ' + dbConnect.threadId);
});

module.exports = devDBConnection;