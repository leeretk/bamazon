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
});
//CONNECTION (working)
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.secret,
  database: "bamazon",
});
connection.connect(function (err) { if (err) {
    console.error(chalk.magenta('ERROR CONNECTING: ' + err.stack));
    return;
  }
  console.log(chalk.yellow('YOU ARE CONNECTED: ' + connection.threadId +'\n'));
  promptManagerAction()
});
//SWITCH PROMPTS (working)
function promptManagerAction() {
    console.log(chalk.yellow('USE ARROWS TO SELECT A MANAGER ACTION'+'\n'));

    //prompt for selection
    inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            choices: ['view-products-for-sale', 'view-low-inventory', 'add-to-inventory', 'add-new-product','exit'],
            filter: function (selection) {
                if (selection === 'view-products-for-sale') {
                    return 'inventoryList';
                } else if (selection === 'view-low-inventory') {
                    return 'lowInventoryList';

                } else if (selection === 'add-to-inventory') {
                    return 'addStock';

                } else if (selection === 'add-new-product') {
                    return 'addItem';

                } else if (selection === 'exit') {
                    return 'exitProgram';
                } 
                              
                else {
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
            } 
            else if (input.option === 'exitProgram') {
                endProgram();
           }           
            else {
                console.log('ERROR: Operation Not Supported');
                exit(1);
            }
    });
};
//VIEW PRODUCTS FOR SALE (working)
function displayItemInventory() {
    var queryProductList = connection.query("SELECT * FROM products",
      function (err, res) {
        console.log(chalk.green('\n'+'\n'+ 'COMPLETE INVENTORY LIST'));
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
};
//VIEW LOW INVENTORY LIST (working)
function displayLowInventory() {
    var queryLowInventoryList = connection.query("SELECT * FROM products WHERE stock_quantity < 100",  
      function (err, res) {
        console.log(chalk.green('\n'+'\n'+'INVENTORY ITEMS BELOW SOH = 100'));
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
    promptManagerAction(); 
};
//VALIDATE INPUT IS NOT NEGATIVE (working)
function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);
  
    if (integer && (sign === 1)) {
      return true;
    } else {
      return 'Must enter a non-negative number. Please try again.';
    }
};
 //ADD STOCK QUANTITY TO INVENTORY ITEM (working)
function addItemSOH() {
    inquirer.prompt([
            {
                type: 'input',
                name: 'item_id',
                message: 'Select item_id to add Quanity to Stock-on-Hand?',
                validate: validateInput,  //make sure item is not negative.
                filter: Number
            },
            {
                type: 'input',
                name: 'quantity',
                message: 'How many units would you like to add to inventory?',
                validate: validateInput, //make sure item is not negative.
                filter: Number
            }     
    ]).then(function (input) {
        var item = input.item_id;
        var inputQuantity = input.quantity;
        var queryData = 'SELECT * FROM products WHERE ?';
        connection.query(queryData, { item_id: item }, function (err, data) 
            {
                if (err) throw err;
                //console.log('data = ' + JSON.stringify(data));
                if (data.length === 0) {
                    console.log(chalk.bgMagenta('ERROR: Invalid Item ID. Please select another Item.'));
                    displayItemInventory();
                } else 
                    {
                        var quantityData = data[0];
                        // console.log('\n' + 'updating stock quantity...' + JSON.stringify(quantityData));
                        console.log('\n' + 'updating stock quantity...');
                        //CONSTRUCT THE QUERY TO UPDATE THE INVENTORY 
                        var addItemStock = connection.query(
                            'UPDATE products SET stock_quantity='
                            + (quantityData.stock_quantity + inputQuantity)
                            + ' WHERE item_id = ' + item);
                        console.log(chalk.blue(
                            '\n' 
                            + 'PREVIOUS STOCK ON HAND QTY:  ' + quantityData.stock_quantity  + '\n'
                            + 'ADDED STOCK ON HAND QTY:  ' + inputQuantity + '\n'
                            + '_______________________________' + '\n'
                            + 'NEW STOCK ON HAND QTY:  ' + (quantityData.stock_quantity + inputQuantity) + '\n'
                            ));
                        // console.log("product list query: " + addItemStock.sql + '\n');
                    }
                    promptManagerAction(); 
            });
        });
};
//ADD NEW ITEM TO PRODUCT LIST (working)
function addNewItem() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'product_name',
            message: 'Product Name?',
        },
        {
            type: 'input',
            name: 'department_name',
            message: 'Department Name?',
        },   
        {
            type: 'input',
            name: 'price',
            message: 'What is the price per unit?',
            validate: validateInput,
        },   
        {
            type: 'input',
            name: 'stock_quantity',
            message: 'Starting Stock on Hand?',
            validate: validateInput,
        }   
    ]).then(function(input) {
     
        //INSERT INPUT INTO SQL DATABASE & THEN SHOW FULL LIST RESULTS
        var addNewInventoryItem = 'INSERT INTO products SET ?';
    
        connection.query(addNewInventoryItem, input, 
             function(err, res, fields) {
                    if (err) throw err;    
                    
       //SHOW INPUT FROM PROMPT
       console.log(chalk.blue(
        '\n' 
        + 'ITEM INPUT:     '
        + 'ITEM ID:        ' + res.insertId + '\n'
        + 'PRODUCT NAME:   ' + input.product_name  + '\n'
        + 'DEPARTMENT NAME:' + input.department_name + '\n'
        + 'PRICE:          ' + formatter.format(input.price) + '\n'
        + 'STOCK QTY:      ' + input.stock_quantity +'\n'
));
        console.log('New product ID: ' + res.insertId + '.');
                console.log("\n---------------------------------------------------------------------\n");
        promptManagerAction();
    });
})};
        
function endProgram() {
    console.log('*******SESSION ENDED******')
    connection.end();
};