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
  promptSupervisorAction()
});
//SWITCH PROMPTS (working)
function promptSupervisorAction() {
    console.log(chalk.yellow('USE ARROWS TO SELECT A SUPERVISOR ACTION'+'\n'));
    //prompt for selection
    inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            choices: ['view-products-sales-by-dept', 'create-new-department', 'exit'],
            filter: function (selection) {
                if (selection === 'view-products-sales-by-dept') {
                    return 'productSalesDept';
                } else if (selection === 'create-new-department') {
                    return 'newDepartment';
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

        if (input.option === 'productSalesDept') {
                displayDeptSales();
            } else if (input.option === 'newDepartment') {
                addNewDept();
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
//VIEW SALES SALE (working)
function displayDeptSales() {
    var queryDeptSalesList = connection.query("SELECT dep.department_id,dep.department_name,sum(pr.product_sales) as over_head_costs FROM departments dep LEFT JOIN bamazon.products pr ON dep.department_name = pr.department_name GROUP BY dep.department_id,dep.department_name",

      function (err, res) {
        console.log(chalk.green('\n'+'\n'+ 'DEPARTMENT SALES'));
        console.log(chalk.green('\n' + "DEPT ID | DEPARTMENT NAME | PRODUCT SALES"));
         if (err) throw err;
       for (var i = 0; i < res.length; i++) {
          console.log(chalk.green(
            res[i].department_id + " | "
            + res[i].department_name + " | "
            + formatter.format(res[i].over_head_costs)));
        };
    });
    console.log("product list query: " + queryDeptSalesList.sql + '\n');
    promptSupervisorAction(); 
};

//ADD NEW DEPARTMENT TO PRODUCT LIST (working)
function addNewDept() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'Department Name?',
        },
        {
            type: 'input',
            name: 'over_head_costs',
            message: 'OverHead Costs?',
            validate: validateInput,
        },   
    ]).then(function(input) {
       
        //INSERT INPUT INTO SQL DATABASE & THEN SHOW FULL LIST RESULTS
        var addNewDepartment = 'INSERT INTO departments (department_id, department_name, over_head_costs) VALUES (?,?,?)';
    
        connection.query(addNewDepartment, [input.department_id, input.department_name, input.over_head_costs], 
             function(err, res) {
                    if (err) throw err;    

        console.log('New product ID: ' + res.insertId + '.');
                        //SHOW INPUT FROM PROMPT
                        console.log(chalk.blue(
                            '\n' 
                            + 'DEPARTMENT INPUT:     '
                            + 'DEPARTMENT ID:        ' +  res.insertId + '\n'
                            + 'DEPARTMENT NAME:   ' + input.department_name  + '\n'
                            + 'OVERHEAD COSTS:' + formatter.format(input.over_head_costs) + '\n'
                        ));
                console.log("\n---------------------------------------------------------------------\n");
                promptSupervisorAction();
            });
})};

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
        
function endProgram() {
    console.log('*******SESSION ENDED******')
    connection.end();
};