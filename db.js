var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "ilyas",
  password: "ilyas",
  database:"test"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//	var sql = 'INSERT INTO customers SET ?';
	var record= { name: 'Pencil', company:2};
	
 	var query = con.query('INSERT INTO customers SET ?',record,function(err, result,fields) {
 		if (!err){

		console.log('success');		
			
   		}else{
   			console.log(query.sql);
     		console.log('Error while performing Query.');
     		
		}
   
  });
