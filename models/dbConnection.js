'user strict';

var mysql = require('mysql');

//local mysql db connection
let connection = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'LDD4XX7xyz',
    password: 'H7eBRWkQb9',
    database: 'LDD4XX7xyz'
  });

  connection.connect(function(err) {
    if(err) {
      console.log(err.code); // 'ECONNREFUSED'
      switch (err.code) {
        case 'PROTOCOL_CONNECTION_LOST':
        console.log('connection lost');
          mysql.createConnection({
              host: 'remotemysql.com',
              user: 'LDD4XX7xyz',
              password: 'H7eBRWkQb9',
              database: 'LDD4XX7xyz'
          }).connect;
          break;
        case 'ECONNREFUSED': 
          console.log('Connection refused');
          break;
        default:
          break;
      }
    }
    }
  );

module.exports = connection;