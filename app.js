var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var mysql = require('mysql');
const port = process.env.PORT || 3000;

var con = mysql.createConnection({
  host: "localhost",
  user: "ilyas",
  password: "ilyas",
  database: "list"
 
});

con.connect(function(err) {
  if (err) throw err;
  	console.log("Connected!");
	
});



//creating instance of express 
var app = express();
var server = http.createServer(app);

//server logging middelware
app.use(function(req, res, next){
	console.log(`${req.method} ${req.url}`);
	next();
});


//set view engine
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname, 'views'));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//static file server
app.use(express.static('public'));

app.get("/" , (req, res) => {
	var sql = 'SELECT * from item_list';
 	con.query(sql, function(err, result, fields) {
 	
   
   if (!err){

     	console.log('The solution is: ', result);
     	res.render('index', {
			title: 'Your List',
			list_items:result
		});

 	  
   }else{
     console.log('Error while performing Query.');
	}
   
  });

});

app.post('/list/add', function(req, res){
	console.log('form submitted...');

	var record= {item_name: req.body.item_name, item_quantity:req.body.item_quantity};
	console.log(record);
 	var query = con.query('INSERT INTO item_list (item_name,item_quantity) VALUES(?,?)', [record.item_name,record.item_quantity]  ,function(err, result,fields) {

 		if (!err){

			res.redirect('/');
			
   		}else{

   			console.log(query.sql);
     		console.log('Error while performing Query.');
     		
		}
    
    });
 	
   

	
});

//console.log(JSON.stringify(list));
app.listen(port, function(){
	console.log(`Server started listening at port:${port}`);
})