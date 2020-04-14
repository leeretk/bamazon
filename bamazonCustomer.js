
//Set Variables
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var inquirer = require("inquirer");
var mysql = require("mysql");

var Mysql = new Mysql(keys.SQL);

console.log(keys.SQL)

//vars to capture input process.argv
var itemNumber = process.argv[2];
var orderQty = process.argv.slice(3).join(" ")

// Run the test and log it to console immediately
console.log(process.argv[2] === process.argv[3]);
console.log(process.argv[2] % 7 === 0 && process.argv[3] % 7 === 0);

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon",
});
console.log("I am at point 1!");

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  newSong();
});



//display all of the items available for sale. 
// ID | PRODUCT  NAME | PRICE | STOCK ON HAND

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



///check inventory 


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
                            