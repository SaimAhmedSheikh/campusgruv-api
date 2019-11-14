const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 3000;
  
  
const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'campusgruv'
});
 
// connect to database
mc.connect();

app.use(express.static('public'))


app.listen(port);

console.log(`API server started on port ${port}`);

app.use(bodyParser.urlencoded({ extended: true }));

var routes = require('./routes/appRoutes'); //importing route
routes(app); //register the route

app.use(express.json());
