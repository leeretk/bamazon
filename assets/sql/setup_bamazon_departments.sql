USE bamazon;

DROP table IF EXISTS departments;

CREATE TABLE departments (
	department_id integer auto_increment
    ,department_name varchar(150)
    ,over_head_costs decimal(5,2)
    ,primary key(department_id)
);

ALTER TABLE departments ADD total_profit decimal(5,2);

INSERT INTO departments (department_name, over_head_costs)
	VALUES 
     ('boys',0)
    ,('girls',0)
    ,('entertainment',0)
    ,('kitchen',0)
    ,('toys',0)
    ,('health',0);

Select * from departments;

-- UPDATE departments SET over_head_costs='***' where department = '**';





