
// var fs = require("fs");
// var inquirer = require("inquirer");
require("dotenv").config();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.secret,
    database: "bamazon",
});
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});
 

  /////////////////////// do not touch //////////////

// require("console.table");


