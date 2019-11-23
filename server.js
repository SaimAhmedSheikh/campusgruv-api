const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 3000;
  
  
const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'LDD4XX7xyz',
  password: 'H7eBRWkQb9',
  database: 'LDD4XX7xyz'
});
 
// connect to database 
mc.connect();

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port);

console.log(`API server started on port ${port}`);


var routes = require('./routes/appRoutes'); //importing route
routes(app); //register the route


