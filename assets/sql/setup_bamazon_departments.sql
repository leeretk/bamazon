USE bamazon;

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





