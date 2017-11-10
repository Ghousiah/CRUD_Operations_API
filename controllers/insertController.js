// Mysql database connections are given in config file
var connection=require('../config');
// I am using asynchronous encryptor to generate hash key 
var bcrypt=require('bcrypt');

// creating register method by passing name, email, password
module.exports.insert=function(req,res){
	var today=new Date();
	bcrypt.hash(req.body.password,10,function(err,bcryptPassword){
	var users={
		"name": req.body.name,
		"email": req.body.email,
		"password": bcryptPassword,
		"created_at": today,
		"updated_at": today
	}
	connection.query('INSERT INTO users SET ?',users,function(error,results,fields){
	if(error){
		res.json({
			status:false,
			message:'There is some error with query'
		})
	}
	else{
		res.json({
			status:true,
			data:results,
			message:'user registered successfully'
		})
	}
	});	
});	
}

