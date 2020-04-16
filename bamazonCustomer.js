
var fs = require("fs");
var inquirer = require("inquirer");
require("dotenv").config();
var mysql = require('mysql');
var chalk = require("chalk");


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
  showAllProducts();
  console.log('connected as id ' + connection.threadId);
});
 
//display all of the items available for sale. 
// ID | PRODUCT  NAME | PRICE | STOCK ON HAND
  
  function showAllProducts() {
    var query = connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log(chalk.green(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity));
      }
    });
  
    // logs the actual query being run
    console.log(query.sql);
    prompt();
    connection.end();
  }
  ///////***///////////***///// do not touch ///////***///////***///////***///////***///////***///////***


//**************Create a "Prompt" with a series of questions*****************//
function prompt() {

    inquirer.prompt([
      {
        type: "list",
        name: "bamazonSearch",
        message: "How would you like to Search?",
        choices: [
          "item-id",
          "item-name",
          "item-price",
          "item-soh-qty",
          "item-dept-name",
          "exit",
        ]
      }
    ]).then(function (inquirerResponse) {
      if (inquirerResponse.bamazonSearch === "item-id") {
        console.log("\nChoice: " + inquirerResponse.bamazonSearch);
  
        inquirer.prompt([
          {
            type: "input",
            name: "searchItemId",
            message: "What item would you like to purchase?"
          }
        ]).then(function (itemResponse) {
          console.log("\nSong Response: " + itemResponse.searchItemId);
          showSpotifyInfo(itemResponse.searchItemId);
        })
      } else if (inquirerResponse.bamazonSearch === "item-name") {
        console.log("\nChoice: " + inquirerResponse.bamazonSearch);
  

        inquirer.prompt([
          {
            type: "input",
            name: "searchItemName",
            message: "What item would you like to purchase?"
          }
        ]).then(function (movieResponse) {
          console.log("\nMovie Response: " + movieResponse.searchItemName);
          showMovieInfo(movieResponse.searchItemName);
        })
      } else if (inquirerResponse.bamazonSearch === "department-name") {
        console.log("\nChoice: " + inquirerResponse.bamazonSearch);
  
        inquirer.prompt([
          {
            type: "input",
            name: "searchDept",
            message: "What item would you like to purchase?"
          }
        ]).then(function (concertResponse) {
          console.log("\nConcert Response: " + concertResponse.searchDept);
          showConcertInfo(concertResponse.searchDept);
        })
      } else if (inquirerResponse.bamazonSearchChoices === "do-what-it-says") {
      } else {
        console.log("all set")
        process.exit();
      }
    }
    );
  }
  prompt();



//prompt 

// Q-1 What is the product ID of the item you want to buy?

// Q-2 How many units would you like to buy?

///customer places order////

// validateInput makes sure that the user is supplying only positive integers for their inputs
        function validateInput(value) {
            var integer = Number.isInteger(parseFloat(value));
            var sign = Math.sign(value);

            if (integer && (sign === 1)) {
                return true;
            } else {
                return 'Please enter a whole non-zero number.';
            }
        }



/pick an item

function requestItem() {


}

/check inventory 


//INSUFFICENT QTY IF --> 

var orderQty = 0
var sohQty = 0

    // // 0 STOCK ON HAND  --> "INSIFFICIENT QUANITITY"  
    //         PROMPT (WOULD YOU LIKE TO PICK ANOTHER ITEM?)
    //         //IF YES --> 
    //             PROMPT (Q1 and Q2)
            //IF ELSE --> (UNITS OF PURCHASE - CURRENT STOCK ON HAND) = X   
                
                this.check 

                    function checkStock(){

                        var x = (orderQty-sohQty)  // the (outcome of order qty - soh qty)

                        if (x > sohQty || sohQty === x) {
                        
                            console.log("Your order has been placed")
                            updateStockQty(); // deduct order qty from stock on hand and update database record with new SOH Qty.
                            prompt(); // would you like to place another order.
    
                        } else if (x < 0) {
                            console.log("We no longer have that item in stock")
                            prompt(); // would you like to place another order.

                                yes 

                                if (x = )
    
                                    prompt(would you like to purchase 3 instead?)

                                    IF YES -->  

                                        console.log("Your order has been placed")
                                        prompt(); // would you like to place another order.   
                                        updateStockQty(); // deduct order qty from stock on hand and update database record with new SOH Qty.
                


                                    UPDATE 
    
                            ELSE IF -->
                                        console.log("We no longer have that item in stock")

                                         updateStockQty(); // deduct order qty from stock on hand and update database record with new SOH Qty.

                                else if {

                                }

                        }
                            


  // function updateProduct() {
  //   console.log("Updating all Rocky Road quantities...\n");
  //   var query = connection.query(
  //     "UPDATE products SET ? WHERE ?",
  //     [
  //       {
  //         quantity: 100
  //       },
  //       {
  //         flavor: "Rocky Road"
  //       }
  //     ],
  //     function(err, res) {
  //       if (err) throw err;
  //       console.log(res.affectedRows + " products updated!\n");
  //       // Call deleteProduct AFTER the UPDATE completes
  //       deleteProduct();
  //     }
  //   );
  //   // logs the actual query being run
  //   console.log(query.sql);
  // }
  
  // function deleteProduct() {
  //   console.log("Deleting all strawberry icecream...\n");
  //   connection.query(
  //     "DELETE FROM products WHERE ?",
  //     {
  //       flavor: "strawberry"
  //     },
  //     function(err, res) {
  //       if (err) throw err;
  //       console.log(res.affectedRows + " products deleted!\n");
  //       // Call readProducts AFTER the DELETE completes
  //       readProducts();
  //     }
  //   );
  // }
  
  // function readProducts() {
  //   console.log("Selecting all products...\n");
  //   connection.query("SELECT * FROM products", function(err, res) {
  //     if (err) throw err;
  //     // Log all results of the SELECT statement
  //     console.log(res);
  //     connection.end();
  //   });
  // }
  
