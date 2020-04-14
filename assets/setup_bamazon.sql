
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

-- UPDATE ice_rinks set iceName='Foothills' where id = '2';







