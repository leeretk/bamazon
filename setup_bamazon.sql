
DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id integer auto_increment
    ,product_name varchar(150)
    ,department_name varchar(150)
    ,price decimal(5,2)
    ,stock_quantity integer
    ,primary key(item_id)
);
USE bamazon;
ALTER TABLE products ADD product_sales decimal(10,2);



INSERT INTO products (product_name,department_name,price,stock_quantity)
	VALUES 
     ('hotwheels', 'toys','2', '20000000')
    ,('bath towels', 'housewares','4.75', '4750')
    ,('shirt', 'mens clothing','6.25', '120')
    ,('skirt', 'womens clothing','7.50', '120000')
    ,('warm-up suit', 'boys','4.99', '400500')
    ,('pajamas', 'girls','106.45', '2350')
    ,('television', 'entertainment','499.99', '150')
    ,('blender', 'kitchen','46.75', '34567')
    ,('barbie doll', 'toys','14.99', '453256')
    ,('trainer shoes', 'health','27.99', '90087');

Select * from products;

-- UPDATE products SET stock_quantity='500' where item_id = '2';

DROP table IF EXISTS departments;

CREATE TABLE departments (
	department_id integer auto_increment
    ,department_name varchar(150)
    ,over_head_costs decimal(5,2)
    ,primary key(department_id)
);
INSERT INTO departments (department_name, over_head_costs)
	VALUES 
     ('boys',450)
    ,('girls',600)
    ,('entertainment',140)
    ,('kitchen',421)
    ,('toys',669)
    ,('health',345);

Select * from departments;

-- UPDATE departments SET over_head_costs='***' where department = '**';



