const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 3002;
  
  
const mysql = require('mysql');
// connection configurations
let connection = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'LDD4XX7xyz',
  password: 'H7eBRWkQb9',
  database: 'LDD4XX7xyz'
});
 
// connect to database 
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

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port);

console.log(`API server started on port ${port}`);


var routes = require('./routes/appRoutes'); //importing route
routes(app); //register the route


