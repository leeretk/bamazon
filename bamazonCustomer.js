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
//CONNECTION (working)
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.secret,
  database: "bamazon",
  multipleStatements: true,
});
connection.connect(function (err) {
  if (err) {
    console.error(chalk.magenta('ERROR CONNECTING: ' + err.stack));
    return;
  }
  console.log(chalk.yellow('YOU ARE CONNECTED: ' + connection.threadId));
  displayItemInventory();
});
//DISPLAY ITEM INVENTORY (working)
function displayItemInventory() {
  var queryProductList = connection.query("SELECT * FROM products",

    function (err, res) {
      console.log(chalk.green('\n' + "ID | PRODUCT NAME | DEPARTMENT | PRICE | STOCK ON HAND | PRODUCT SALES"));

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
//FUNCTION TO PROMPT SWITCH (working)
function promptOrderItem() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      choices: ['place-order', 'exit'],
      filter: function (selection) {
        if (selection === 'place-order') {
          return 'placeOrders';
        } else if (selection === 'exit') {
          return 'exitProgram';
        }
        else {
          console.log('ERROR: Operation Not Supported');
          exit(1);
        }
      }
    }
  ]).then(function (input) {
    if (input.option === 'placeOrders') {
      placeOrder();
    }
    else if (input.option === 'exitProgram') {
      endProgram();
    }
    else {
      console.log('ERROR: Operation Not Supported');
    };
  })
};
//FUNCTION TO PLACE ORDER
function placeOrder() {
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
  ]).then(function(input) {
        // console.log('user selected: ' + JSON.stringify(input));
        //create variables for item input
        var item = input.item_id;
        var quantity = input.quantity;

        var queryData = 'SELECT * FROM products WHERE ?';

        connection.query(queryData, { item_id: item }, function (err, data) {
          if (err) throw err;
          // console.log('data = ' + JSON.stringify(data));
          if (data.length === 0) {
            console.log(chalk.bgMagenta('ERROR: Invalid Item ID. Please select another Item.'));
            displayItemInventory();
          } else {
            var orderData = data[0];
            console.log('\n' + 'orderData = ' + JSON.stringify(orderData));
            //VALIDATE THERE IS QUANTITY IN STOCK TO FILL ORDER?
            if (quantity <= orderData.stock_quantity) {
              console.log(chalk.yellow('\n' + '****Item is available, your order is being processed!****' + '\n'));

//******************************************THIS IS WHERE YOU ARE STUCK *****************************************///

              //CONSTRUCT THE QUERY TO UPDATE THE INVENTORY QUANTITY AFTER AN ORDER HAS BEEN FILLED.
              var stockQuantity = (orderData.stock_quantity - quantity)
              var productSales = (orderData.price * quantity)

              var updateOrderData = 'UPDATE products SET stock_quantity =?' + stockQuantity + ',product_sales=?'+ productSales + ', WHERE item_id =?' + item ;  
    
              //PROCESS ORDER AND UPDATE INVENTORY STOCK ON HAND QUANTITY
              connection.query(updateOrderData, [stock_quantity, products_sales], function (err, res, field) {
                if (err) throw err;
                console.log("QUERY WORKED**************************************************")

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
                console.log(chalk.blue('\n' + 'PRODUCT SALES TOTAL: ' + formatter.format(orderData.price * quantity)));
                promptOrderItem();
              });
      };
    };
  })
});
//VALIDATE INPUT IS NOT NEGATIVE
function validateInput(value) {
      var integer = Number.isInteger(parseFloat(value));
      var sign = Math.sign(value);
      if (integer && (sign === 1)) {
        return true;
      } else {
        return 'Must enter a non-negative number. Please try again.';
      }
};
}
//END PROGRAM
function endProgram() {
  console.log('*******SESSION ENDED******')
  connection.end();
};