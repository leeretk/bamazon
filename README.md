# BAMAZON

BAMAZON is an online ordering center.

## BAMAZON CUSTOMER ORDER CENTER

## GitHub Repository: https://github.com/leeretk/liri-node-app

### What can Liri find for you?
* Songs using Spotify
* Upcoming Concerts with Bands in Town
* Movie Information with OMDB

### Technolgoy 
* [Inquirer](https://www.npmjs.com/package/inquirer)
* [mysql](https://www.npmjs.com/package/mysql)

## Instructions
1) Open Bamazon command line node application
2) Type in node bamazonCustomer.js, bamazonManager.js or bamazonSupervisor.js and hit enter


### Initialize Application
1) Questions will appear asking you to select an option:
    -place-an-order
    -exit

1) Items available for order appear
    a) Question appears asking customer to select an item_id
    b) Quesion appears asking the cusomter how many they would like to order.

![](https://github.com/leeretk/bamazon/blob/master/assets/images/customer_1_initialize.JPG)

### Enter Order Information

![](https://github.com/leeretk/bamazon/blob/master/assets/images/customer_2_enter_order.JPG)

### Validate Order Information

Validation occurs when the item ID and the order quantity are entered.  Validate ensures the number entered is a positive integeter.
Validate also checks to make sure the item ID entered is availabe.

When an item is entered incorrectly the following messages appear.

Invalid Item ID:
![](https://github.com/leeretk/bamazon/blob/master/assets/images/customer_3_itemid_validation.JPG)

Invalid Quantity:
![](https://github.com/leeretk/bamazon/blob/master/assets/images/customer_4_quantity_validation.JPG)

Unavailable Stock Qty:
![](https://github.com/leeretk/bamazon/blob/master/assets/images/customer_5_invalid_itemid_msg.JPG)
![](https://github.com/leeretk/bamazon/blob/master/assets/images/customer_6_stock_out_msg.JPG)


### Decrement Inventory

Here the program will deduct the order quantity from the stock on hand quantity and show the new quantity on hand.
![](https://github.com/leeretk/bamazon/blob/master/assets/images/customer_7_new_soh_qty.JPG)

### Would you like to place another order

## BAMAZON INVENTORY MANAGER



## BAMAZON SUPERVISOR





