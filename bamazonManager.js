var fs = require("fs");
var inquirer = require("inquirer");
require("dotenv").config();
var mysql = require("mysql");
var chalk = require("chalk");
//var table = require("text-table");

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: "USD",
  minimumFractionDigits: 2
})

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.secret,
  database: "bamazon",
});

connection.connect(function (err) {
  if (err) {
    console.error(chalk.magenta('ERROR CONNECTING: ' + err.stack));
    return;
  }
  console.log(chalk.yellow('YOU ARE CONNECTED: ' + connection.threadId));
});

//Execute switch function to query database lists 
var userQry = process.argv[2];
var qryParameter = process.argv.slice(3).join(" ")

UserQuery(userQry, qryParameter);

function UserQuery(userQry, qryParameter) {
    switch (userQry) {
      case 'view-products-for-sale':
        displayItemInventory(qryParameter);
        break;
      case 'view-low-inventory':
        displayLowInventory(qryParameter);
        break;
      case 'add-to-inventory':
        addItemSOH(qryParameter);
        break;
      case 'add-new-product':
        addNewItem(qryParameter);
        break;
    }
  };

  



//VIEW PRODUCTS FOR SALE 
function displayItemInventory(qryParameter) {
    if (qryParameter === "") {
        // qryParameter = enter default value here//
      }
    var queryProductList = connection.query("SELECT * FROM products",
  
      function (err, res) {
        console.log(chalk.green('\n' + "ID | PRODUCT NAME | DEPARTMENT | PRICE | STOCK ON HAND"));
  
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
          console.log(chalk.green(
            res[i].item_id + " | "
            + res[i].product_name + " | "
            + res[i].department_name + " | "
            + formatter.format(res[i].price) + " | "
            + res[i].stock_quantity));
        }
      });
    //logs the actual query being run
    console.log("product list query: " + queryProductList.sql + '\n');
  }

//VIEW LOW INVENTORY LIST
function displayLowInventory() {
    if (qryParameter === "") {
        // qryParameter = enter default value here//
    }

    var queryLowInventoryList = connection.query("SELECT * FROM products WHERE stock_quantity < 5",
  
      function (err, res) {
        console.log(chalk.green('\n' + "ID | PRODUCT NAME | DEPARTMENT | PRICE | STOCK ON HAND"));
  
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
          console.log(chalk.green(
            res[i].item_id + " | "
            + res[i].product_name + " | "
            + res[i].department_name + " | "
            + formatter.format(res[i].price) + " | "
            + res[i].stock_quantity));
        }
      });
    //logs the actual query being run
    console.log("Low Inventory List Query: " + queryLowInventoryList.sql + '\n');
  }

//ADD STOCK QUANTITY TO INVENTORY ITEM
function addItemSOH() {
    if (qryParameter === "") {
        // qryParameter = enter default value here//
    }
    //CONSTRUCT THE QUERY TO UPDATE THE INVENTORY 
    var addItemStockonHand = connection.query(
        'UPDATE products SET stock_quantity=' 
        + (stock_quantity + input.quantity) 
        + ' WHERE item_id = ' + item);

     //logs the actual query being run
     console.log(chalk.blue('\n' + 'NEW STOCK ON HAND QTY:  ' + (stock_quantity + input.quantity)));
    console.log("product list query: " + addItemStockonHand.sql + '\n');
}

//ADD NEW ITEM TO PRODUCT LIST
function addNewItem() {
    if (qryParameter === "") {
        // qryParameter = enter default value here//
    }
    var addNewInventoryItem = connection.query(
        'INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES (input.product_name, input.department_name, input.price, input.stock_quantity)'); 

    var itemID = res.resultID
    console.log(itemID)
    //logs the actual query being run
    console.log("product list query: " + addNewInventoryItem.sql + '\n');
    connection.end()
  }

