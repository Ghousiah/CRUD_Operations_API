var mysql=require('mysql');

// passing the database credentials
var connection=mysql.createConnection({
	host:'localhost',
	port:'3306',
	user:'root',
	password:'',
	database:'test'
});

// establishing the connection to database
connection.connect(function(err){
	if(!err){
		console.log("Database is connected");
	}	
	else{
		console.log("Error while connecting database");
	}
});

// finally, exporting or making it available to other modules
module.exports=connection;