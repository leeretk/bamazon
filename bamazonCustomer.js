//Set Variables
require("dotenv").config();
var fs = require("fs");
var keys = require("./key.js");
var inquirer = require("inquirer");

// ************************ SQL ***************** //

var mysql = require('mysql');

var mysqlQry = new mysql(keys.spotify);
console.log(keys.mysqlQry)

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'bamazon'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
  });
  connection.connect();


  // function readProducts() {
  //   console.log("Selecting all products...\n");
  //   connection.query("SELECT * FROM products", function(err, res) {
  //     if (err) throw err;
  //     // Log all results of the SELECT statement
  //     console.log(res);
  //     connection.end();
  //   });
  // }



//   function createProduct() {
//     console.log("Inserting a new product...\n");
//     var query = connection.query(
//       "INSERT INTO products SET ?",
//       {
//         product_name: "testing",
//         department_name: "test dept",
//         price: 3.0,
//         stock_quantity: 50
//       },
//       function(err, res) {
//         if (err) throw err;
//         console.log(res.affectedRows + " product inserted!\n");
//         // Call updateProduct AFTER the INSERT completes
//         updateProduct();
//       }
//     );
//     console.log(query.sql);
// }

// //   function validateInput(value) {
// // 	var integer = Number.isInteger(parseFloat(value));
// // 	var sign = Math.sign(value);

// // 	if (integer && (sign === 1)) {
// // 		return true;
// // 	} else {
// // 		return 'Please enter a whole non-zero number.';
// // 	}
// // }


// // function newOrder() {
// //     console.log("Place a new order...\n");

// //     var query = connection.query(
//         "INSERT INTO mysongs_db SET ?",
//         {
//           title: "Uptown Funk",
//           artist: "Mark Ronson",
//           genre: "Pop"
//         },
//         function(err, res) {
//           if (err) throw err;
//           console.log(res.affectedRows + " song inserted!\n");
//           // Call updateProduct AFTER the INSERT completes
//           updateProduct();
//           console.log("NEW SONG ADDED");
//         }
    
//       );

//   fs.appendFileSync("log.txt", "**********MOVIE INFO*********\n");
//       fs.appendFileSync("log.txt", "Title: " + connection.threadId + "\n"); 
// //   newitem();
// // });


// var mysqlQry = new Mysql(keys.mysql);

// var itemNumber = process.argv[2];
// var orderQty = process.argv[2];
// var deptName = process.argv.slice(3).join(" ")

// // Run the test and log it to console immediately
// console.log(process.argv[2] === process.argv[3]);
// console.log(process.argv[2] % 7 === 0 && process.argv[3] % 7 === 0);


// //Execute function
// UserQuery(userQry, qryParameter);

// function UserQuery(userQry, qryParameter) {
//   switch (userQry) {
//     case 'concert-this':
//       showConcertInfo(qryParameter);
//       break;
//     case 'spotify-this-song':
//       showSpotifyInfo(qryParameter);
//       break;
//     case 'movie-this':
//       showMovieInfo(qryParameter);
//       break;
//     case 'do-what-it-says':
//       whatThisInfo(qryParameter);
//       break;
//   }
// };

// //Spotify
// function showSpotifyInfo(qryParameter) {
//     if (qryParameter === "") {
//       qryParameter = "The Sign"; //song default
//     }
//     spotifyQry.search(
//       {
//         type: "track",
//         limit: 1,
//         query: qryParameter
//       },
//       function (err, data) {
//         if (err) {
//           console.log("error" + err)
//           return;
//         }
//         var songs = data.tracks.items;
  
//         for (var i = 0; i < songs.length; i++) {
//           console.log("********************************************");
//           console.log("SPOTIFY SONG INFORMATION");
//           console.log("-----------------------------");
//           console.log("Query Parameter: " + qryParameter)
//           console.log("-----------------------------");
//           console.log("Record Number: " + i);
//           console.log("Song Name: " + data.tracks.items[i].name);
//           console.log("Preview Song: " + songs[i].preview_url);
//           console.log("Album: " + songs[i].album.name);
//           console.log("Artist(s): " + songs[i].artists[0].name);
//           console.log("********************************************");
  
//           fs.appendFileSync("log.txt", "********************************************\n");
//           fs.appendFileSync("log.txt", "SPOTIFY SONG INFORMATION\n");
//           fs.appendFileSync("log.txt", "-----------------------------\n");
//           fs.appendFileSync("log.txt", "Query Parameter: " + qryParameter + "\n")
//           fs.appendFileSync("log.txt", "-----------------------------\n");
//           fs.appendFileSync("log.txt", "Song Name: " + songs[i].name + "\n");
//           fs.appendFileSync("log.txt", i + "\n");
//           fs.appendFileSync("log.txt", "Preview Song: " + songs[i].preview_url + "\n");
//           fs.appendFileSync("log.txt", "Album: " + songs[i].album.name + "\n");
//           fs.appendFileSync("log.txt", "Artist(s): " + songs[i].artists[0].name + "\n");
//           fs.appendFileSync("log.txt", "********************************************\n");
//           prompt();
//         }
//       }
//     );
//   };


// //Create a "Prompt" with a series of questions.
// function prompt() {

//     inquirer.prompt([
//       {
//         type: "list",
//         name: "bamazonSearchChoices",
//         message: "What would you like to Search On?",
//         choices: [
//           "item-id",
//           "item-name",
//           "item-price",
//           "item-soh-qty",
//           "item-dept-name",
//           "exit",
//         ]
//       }
//     ]).then(function (inquirerResponse) {
//       if (inquirerResponse.bamazonSearchChoices === "item-id") {
//         console.log("\nChoice: " + inquirerResponse.bamazonSearchChoices);
  
//         inquirer.prompt([
//           {
//             type: "input",
//             name: "songThis",
//             message: "What song would like to hear?"
//           }
//         ]).then(function (songResponse) {
//           console.log("\nSong Response: " + songResponse.songThis);
//           showSpotifyInfo(songResponse.songThis);
//         })
//       } else if (inquirerResponse.bamazonSearchChoices === "movie-this") {
//         console.log("\nChoice: " + inquirerResponse.bamazonSearchChoices);
  
//         inquirer.prompt([
//           {
//             type: "input",
//             name: "movieThis",
//             message: "What move would like to see?"
//           }
//         ]).then(function (movieResponse) {
//           console.log("\nMovie Response: " + movieResponse.movieThis);
//           showMovieInfo(movieResponse.movieThis);
//         })
//       } else if (inquirerResponse.bamazonSearchChoices === "concert-this") {
//         console.log("\nChoice: " + inquirerResponse.bamazonSearchChoices);
  
//         inquirer.prompt([
//           {
//             type: "input",
//             name: "concertThis",
//             message: "What artist or band would like to see?"
//           }
//         ]).then(function (concertResponse) {
//           console.log("\nConcert Response: " + concertResponse.concertThis);
//           showConcertInfo(concertResponse.concertThis);
//         })
//       } else if (inquirerResponse.bamazonSearchChoices === "do-what-it-says") {
  
//         inquirer.prompt([
//           {
//             type: "input",
//             name: "whatItSaysThis",
//             message: "Do Whay It Says?"
//           }
//         ]).then(function (anyResponse) {
//           console.log("\nConcert Response: " + anyResponse.whatItSaysThis);
//           showSomeInfo();
//         })
//       } else {
//         console.log("all set")
//         process.exit();
//       }
//     }
//     );
//   }
//   prompt();

// // //display all of the items available for sale. 
// // // ID | PRODUCT  NAME | PRICE | STOCK ON HAND

// // //prompt 

// // // Q-1 What is the product ID of the item you want to buy?

// // // Q-2 How many units would you like to buy?

// // ///customer places order////

// // // validateInput makes sure that the user is supplying only positive integers for their inputs
// //         function validateInput(value) {
// //             var integer = Number.isInteger(parseFloat(value));
// //             var sign = Math.sign(value);

// //             if (integer && (sign === 1)) {
// //                 return true;
// //             } else {
// //                 return 'Please enter a whole non-zero number.';
// //             }
// //         }



// ///pick an item

// function requestItem() {


// }

// ///check inventory 


// //INSUFFICENT QTY IF --> 

// var orderQty = 0
// var sohQty = 0

//     // // 0 STOCK ON HAND  --> "INSIFFICIENT QUANITITY"  
//     //         PROMPT (WOULD YOU LIKE TO PICK ANOTHER ITEM?)
//     //         //IF YES --> 
//     //             PROMPT (Q1 and Q2)
//             //IF ELSE --> (UNITS OF PURCHASE - CURRENT STOCK ON HAND) = X   
                
//                 this.check 

//                     function checkStock(){

//                         var x = (orderQty-sohQty)  // the (outcome of order qty - soh qty)

//                         if (x > sohQty || sohQty === x) {
                        
//                             console.log("Your order has been placed")
//                             updateStockQty(); // deduct order qty from stock on hand and update database record with new SOH Qty.
//                             prompt(); // would you like to place another order.
    
//                         } else if (x < 0) {
//                             console.log("We no longer have that item in stock")
//                             prompt(); // would you like to place another order.

//                                 yes 

//                                 if (x = )
    
//                                     prompt(would you like to purchase 3 instead?)

//                                     IF YES -->  

//                                         console.log("Your order has been placed")
//                                         prompt(); // would you like to place another order.   
//                                         updateStockQty(); // deduct order qty from stock on hand and update database record with new SOH Qty.
                


//                                     UPDATE 
    
//                             ELSE IF -->
//                                         console.log("We no longer have that item in stock")

//                                          updateStockQty(); // deduct order qty from stock on hand and update database record with new SOH Qty.

//                                 else if {

//                                 }

//                         }
                            