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
  displayItemInventory();
});

//display all of the items available for sale. 
function displayItemInventory() {
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
      promptOrderItem();
    });
  //logs the actual query being run
  console.log("product list query: " + queryProductList.sql + '\n');
}

//**************Create a "Prompt" with a series of questions
// Q-1 What is the product ID of the item you want to buy?
// Q-2 How many units would you like to buy?*****************//

function promptOrderItem() {

  inquirer.prompt([
    {
      type: 'input',
      name: 'item_id',
      message: 'What is the product ID of the item you want to buy?',
      validate: validateInput,  //make sure item is not negative.
      filter: Number
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'How many units would you like to buy?',
      validate: validateInput, //make sure item is not negative.
      filter: Number
    }
  
  



    
  
  ]).then(function (input) {

      var item = input.item_id;
      var quantity = input.quantity;

      var queryData = 'SELECT * FROM products WHERE ?';

      connection.query(queryData, { item_id: item }, function (err, data) {
        if (err) throw err;
        //console.log('data = ' + JSON.stringify(data));

        if (data.length === 0) {
          console.log(chalk.bgMagenta('ERROR: Invalid Item ID. Please select another Item.'));
          displayItemInventory();

        } else {

          var orderData = data[0];
          //console.log('\n' + 'orderData = ' + JSON.stringify(orderData));

          //VALIDATE THERE IS QUANTITY IN STOCK TO FILL ORDER?
          if (quantity <= orderData.stock_quantity) {

            console.log(chalk.yellow('\n' + '****Item is available, your order is being processed!****' + '\n'));

            //CONSTRUCT THE QUERY TO UPDATE THE INVENTORY QUANTITY AFTER AN ORDER HAS BEEN FILLED.
            var updateInventoryQueryData = 'UPDATE products SET stock_quantity = ' + (orderData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

            //PROCESS ORDER AND UPDATE INVENTORY STOCK ON HAND QUANTITY
            connection.query(updateInventoryQueryData, function (err, data) {
              if (err) throw err;

              console.log(chalk.yellow("\n---------------------------ORDER DATA------------------------------------------\n"));

              console.log(chalk.green(
                '\n' + 'Item Id: ' + orderData.item_id + '  Product Name: ' + orderData.product_name + '  Stock on Hand: ' + orderData.stock_quantity
                + '\n' + 'Item Price: ' + formatter.format(orderData.price)
                + '\n' + 'Order Quantity: ' + input.quantity
                + '\n' + '******************************'
                + '\n' + 'ORDER TOTAL: ' + formatter.format(orderData.price * quantity)
                + '\n' + '******************************'
              ));
              console.log(chalk.yellow('\n' + 'Your order has been placed! Thank you for shopping with bamazon!'));
              console.log(chalk.yellow("\n----------------------------ORDER COMPLETE------------------------------------\n"));
              console.log(chalk.blue('\n' + 'NEW STOCK ON HAND QTY:  ' + (orderData.stock_quantity - quantity)));

            //CONSTRUCT THE QUERY TO UPDATE THE SALES TOTAL
            var updateSalesData = 'UPDATE products SET product_sales = ' + (orderData.price * quantity) + ' WHERE item_id = ' + item;

                //PROCESS ORDER AND UPDATE PRODUCTS SALES 
                connection.query(updateSalesData, function (err, data) {
                  if (err) throw err;

                  console.log(chalk.yellow("\n---------------------------ORDER DATA------------------------------------------\n"));

                  console.log(chalk.green(
                    '\n' + 'Item Id: ' + updateSalesData.item_id + '  Product Name: ' + orderData.product_name + '  Stock on Hand: ' + orderData.stock_quantity
                    + '\n' + 'Item Price: ' + formatter.format(orderData.price)
                    + '\n' + 'Order Quantity: ' + input.quantity
                    + '\n' + '******************************'
                    + '\n' + 'PRODUCT SALES TOTAL: ' + formatter.format(orderData.price * quantity)
                    + '\n' + '******************************'
                  ));
                  console.log(chalk.yellow('\n' + 'Your order has been placed! Thank you for shopping with bamazon!'));
                  console.log(chalk.yellow("\n----------------------------ORDER COMPLETE------------------------------------\n"));
                  console.log(chalk.blue('\n' + 'NEW STOCK ON HAND QTY:  ' + (orderData.stock_quantity - quantity)));
            })
          } else {
            console.log(chalk.bgMagenta('Sorry, there is not enough product in stock, would you like to purchase something else?'));
            console.log(chalk.bgMagenta('Please select another item.'));
            console.log("\n-----------------------------------------------------------------------------------\n");
            displayItemInventory();
          }
        }
      })
    })
}

//VALIDATE INPUT IS NOT NEGATIVE
function validateInput(value) {
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);

  if (integer && (sign === 1)) {
    return true;
  } else {
    return 'Must enter a non-negative number. Please try again.';
  }
}

// console.log(chalk.yellow("Would you like to place another order?"));
// displayItemInventory();

