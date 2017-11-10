// MySql database configurations are given in config file
var connection = require('../config');
// I am using asynchronous encryptor to generate hash key for password
var bcrypt=require('bcrypt');

// creating login function by passing email and password
module.exports.select=function(req,res){
	var name =req.body.name;
	var email=req.body.email;
	var password=req.body.password;
	connection.query('SELECT * FROM users WHERE name=? OR email = ?',[name,email], function (error, results, fields) {
		if (error) {
			  res.json({
				status:false,
				message:'there are some error with query'
				})
		  }else{
			if(results.length >0){
				bcrypt.compare(password,results[0].password,function(err,hashPwd){			
					if(hashPwd){
						res.json({
							status:true,
							message:'successfully authenticated'
						});
					}else{
						res.json({
						  status:false,
						  message:"Email and password does not match"				  
						 });
					}
				});
			}
			else{
			  res.json({
				  status:false,    
				message:"Email does not exits"
			  });
			}
		}
	});
}