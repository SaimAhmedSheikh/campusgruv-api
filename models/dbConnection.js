'user strict';

var mysql = require('mysql');

//local mysql db connection
const connection = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'LDD4XX7xyz',
    password: 'H7eBRWkQb9',
    database: 'LDD4XX7xyz'
  });

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;