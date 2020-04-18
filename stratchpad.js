

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
