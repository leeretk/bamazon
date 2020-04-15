


/// show product information





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

// //display all of the items available for sale. 
// // ID | PRODUCT  NAME | PRICE | STOCK ON HAND

// //prompt 

// // Q-1 What is the product ID of the item you want to buy?

// // Q-2 How many units would you like to buy?

// ///customer places order////

// // validateInput makes sure that the user is supplying only positive integers for their inputs
//         function validateInput(value) {
//             var integer = Number.isInteger(parseFloat(value));
//             var sign = Math.sign(value);

//             if (integer && (sign === 1)) {
//                 return true;
//             } else {
//                 return 'Please enter a whole non-zero number.';
//             }
//         }



///pick an item

function requestItem() {


}

///check inventory 


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
                            