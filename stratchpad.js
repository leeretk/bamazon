


  inquirer
  .prompt([

    {
      name: "choice",
      type: "rawlist",
      choices: function() {

        var choiceArray = [];
        for (var i = 0; i < results.length; i++) {
          choiceArray.push(results[i].item_name);
        }
        return choiceArray;
      },
      message: "What item would you like to purchase?"
    },
    {
      name: "order",
      type: "input",
      message: "How much many would you like to buy?"
    }
  ])

  .then(function(answer) {
    // get the information of the chosen item
    var chosenItem;
    for (var i = 0; i < results.length; i++) {
      if (results[i].item_name === answer.choice) {
        chosenItem = results[i];
      }
    }

    then(function (itemIDResponse) {

      console.log("\nItem ID Response: " + itemIDResponse.searchItemId);
  
      var itemSelected; 
      
      var itemQuery= connection.query(
        "SELECT * FROM products WHERE item_id=?" + itemIDResponse.searchItemId, 
        
        function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
    
          console.log(chalk.green(
            res[i].item_id + " | "
            + res[i].product_name + " | "
            + res[i].department_name + " | "
            + res[i].price + " | "
            + res[i].stock_quantity));
        }
      });
      // logs the actual query being run
      console.log(queryItem.sql);
    }
  
    });
  }
  
  
  function showAllProducts() {


    var query = connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log(chalk.green(
          res[i].item_id + " | " 
        + res[i].product_name + " | " 
        + res[i].department_name + " | " 
        + res[i].price + " | " 
        + res[i].stock_quantity));
        
    }
    });
  
    // logs the actual query being run
    console.log(query.sql);
    connection.end();
  }
  
  function promptSelectItem() {
  
    inquirer.prompt([
      {
        type: "choice",
        name: "rawlist",
        choices: function () {
          function (err, res) {
          var choiceArray = [];
          for (var i = 0; i < res.length; i++) {
            choiceArray.push(res[i].item_id);
          }
          return choiceArray;
        },
        message: "What is the product ID of the item you would like to buy?",
      },
      
      
  
  
      {
        name: "order",
        type: "input",
        message: "How much many would you like to buy?"
      }
    ]).then(function (answer) {
      // get the information of the chosen item
      var chosenItem;
      for (var i = 0; i < res.length; i++) {
        if (results[i].item_name === answer.choice) {
          chosenItem = res[i];
        }
      }
    }
  )};
   
  const data = [
    ['-rw-r--r--', '1', 'pandorym', 'staff', '1529', 'May 23 11:25', 'LICENSE'],
    ['-rw-r--r--', '1', 'pandorym', 'staff', '16327', 'May 23 11:58', 'README.md'],
    ['drwxr-xr-x', '76', 'pandorym', 'staff', '2432', 'May 23 12:02', 'dist'],
    ['drwxr-xr-x', '634', 'pandorym', 'staff', '20288', 'May 23 11:54', 'node_modules'],
    ['-rw-r--r--', '1,', 'pandorym', 'staff', '525688', 'May 23 11:52', 'package-lock.json'],
    ['-rw-r--r--@', '1', 'pandorym', 'staff', '2440', 'May 23 11:25', 'package.json'],
    ['drwxr-xr-x', '27', 'pandorym', 'staff', '864', 'May 23 11:25', 'src'],
    ['drwxr-xr-x', '20', 'pandorym', 'staff', '640', 'May 23 11:25', 'test'],
  ];
   
  config = {
    border: getBorderCharacters(`name of the template`)
  };

  const config = {
    singleLine: true
  };
   
  const output = table(data, config);
  console.log(output);


  var fs = require("fs");
var inquirer = require("inquirer");
require("dotenv").config();
var mysql = require('mysql');
var chalk = require("chalk");
// var table = require("text-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.secret,
  database: "bamazon",
});
connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
  showAllProducts();
});

//display all of the items available for sale. 
// ID | PRODUCT  NAME | PRICE | STOCK ON HAND

function showAllProducts() {
  var query = connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {

      console.log(chalk.green(
        res[i].item_id + " | "
        + res[i].product_name + " | "
        + res[i].department_name + " | "
        + res[i].price + " | "
        + res[i].stock_quantity));
    }
  });
  // logs the actual query being run
  console.log(query.sql);
}
promptItemSearch();

///////***///////////***///// do not touch ///////***///////***///////***///////***///////***///////***
///////***///////////***///// do not touch ///////***///////***///////***///////***///////***///////***
///////***///////////***///// do not touch ///////***///////***///////***///////***///////***///////***

//**************Create a "Prompt" with a series of questions*****************//
       // Q-1 What is the product ID of the item you want to buy?
       // Q-2 How many units would you like to buy?

function promptItemSearch() {

  inquirer.prompt([
    {
      type: "input",
      name: "searchItemId",
      message: "What is the product ID of the item you would like to buy?"
    }

  ]).then(function (itemIDResponse) {
    
    console.log("\nItem ID Response: " + itemIDResponse.searchItemId);
    
  } else if {
    console.log("THIS IS THE END OF THE PROMPT FUNCTION");

  });






  
  promptHowMany();
};

function promptHowMany() {
             
    inquirer.prompt([
        {
          type: "input",
          name: "howManyToBuy",
          message: "How many would you like to buy?"
        }
      ]).then(function (itemQtyResponse) {
        console.log("\nItem Name Response: " + itemNameResponse.howManyToBuy);
        showAllProducts(itemQtyResponse.howManyToBuy);
      })
      } else {
      console.log("THIS IS THE END OF THE PROMPT FUNCTION")
      connection.end();
    }
  });

}

function itemLookup() {
    var query = connection.query("SELECT * FROM products WHERE item_id=?", function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
  
        console.log(chalk.green(
          res[i].item_id + " | "
          + res[i].product_name + " | "
          + res[i].department_name + " | "
          + res[i].price + " | "
          + res[i].stock_quantity));
      }
    });
    // logs the actual query being run
    console.log(query.sql);
    connection.end();
  }



///customer places order////

// validateInput makes sure that the user is supplying only positive integers for their inputs
function validateInput(value) {
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);

  if (integer && (sign === 1)) {
    return true;
  } else {
    return 'Please enter a whole non-zero number.';
    connection.end();
  }
}

    //     var t=table ([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price,  
    //       res[i].stock_quantity]);

    // consol.log(t)


// /pick an item

// function requestItem() {


// }

// /check inventory 


// //INSUFFICENT QTY IF --> 

// var orderQty = 0
// var sohQty = 0

    // // 0 STOCK ON HAND  --> "INSIFFICIENT QUANITITY"  
    //         PROMPT (WOULD YOU LIKE TO PICK ANOTHER ITEM?)
    //         //IF YES --> 
    // //             PROMPT (Q1 and Q2)
    //         //IF ELSE --> (UNITS OF PURCHASE - CURRENT STOCK ON HAND) = X   

    //             this.check 

    //                 function checkStock(){

    //                     var x = (orderQty-sohQty)  // the (outcome of order qty - soh qty)

    //                     if (x > sohQty || sohQty === x) {

    //                         console.log("Your order has been placed")
    //                         updateStockQty(); // deduct order qty from stock on hand and update database record with new SOH Qty.
    //                         prompt(); // would you like to place another order.

    //                     } else if (x < 0) {
    //                         console.log("We no longer have that item in stock")
    //                         prompt(); // would you like to place another order.

    //                             yes 

    //                             if (x = )

    //                                 prompt(would you like to purchase 3 instead?)

    //                                 IF YES -->  

    //                                     console.log("Your order has been placed")
    //                                     prompt(); // would you like to place another order.   
    //                                     updateStockQty(); // deduct order qty from stock on hand and update database record with new SOH Qty.



    //                                 UPDATE 

    //                         ELSE IF -->
    //                                     console.log("We no longer have that item in stock")

    //                                      updateStockQty(); // deduct order qty from stock on hand and update database record with new SOH Qty.

    //                             else if {

    //                             }

    //                     }



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

