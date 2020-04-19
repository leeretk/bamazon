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
  promptManagerAction()
});

//Execute switch function to query database lists 

function promptManagerAction() {
    console.log('__________ENTER  promptManagerAction_______');

    //prompt for selection
    inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            choices: ['view-products-for-sale', 'view-low-inventory', 'add-to-inventory', 'add-new-product'],
            filter: function (selection) {
                if (selection === 'view-products-for-sale') {
                    return 'inventoryList';
                } else if (selection === 'view-low-inventory') {
                    return 'lowInventoryList';

                } else if (selection === 'add-to-inventory') {
                    return 'addStock';

                } else if (selection === 'add-new-product') {
                    return 'addItem';
                } else {
                    console.log('ERROR: Operation Not Supported');
                    exit(1);
                }
            }
        }
    ]).then(function(input) {
        console.log('user selected: ' + JSON.stringify(input));

        if (input.option === 'inventoryList') {
                displayItemInventory();
            } else if (input.option === 'lowInventoryList') {
                 displayLowInventory();

            } else if (input.option === 'addStock') {
                addItemSOH();

            } else if (input.option === 'addItem') {
                 addNewItem();
            } else {
                console.log('ERROR: Operation Not Supported');
                exit(1);
            }
    });
}


//VIEW PRODUCTS FOR SALE (working)
function displayItemInventory() {
  console.log('___ENTER displayItemInventory___');

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
    console.log("product list query: " + queryProductList.sql + '\n');
    promptManagerAction(); 
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

