var connection=require('../config');
var bcrypt=require('bcrypt');

module.exports.update=function(req,res){
	var updatedat=new Date();
	var name=req.body.name;
	var email=req.body.email;
	var oldpassword=req.body.password;
	var newpassword=req.body.newpassword;
	var confirmpassword=req.body.confirmpassword;
	
	connection.query('SELECT * FROM users WHERE name=? OR email=?',[name,email],function(errors,response,field){
		if((!errors) && (response.length>0)){
			bcrypt.compare(oldpassword,response[0].password,function(errs,boolhash){
				if(boolhash){
					if (newpassword===confirmpassword) 
					{	
						if(newpassword!==oldpassword){
							bcrypt.hash(newpassword,10,function(error,bcryptpassword){
								
								if(!error){
									connection.query('UPDATE users SET password=?, updated_at=? WHERE name=? or email=?',[bcryptpassword,updatedat,name,email],function(err,results,fields){
										if(err){
											console.log("error: ",err);
											res.json({
												status:false,
												message:"There is some error with query"
											});
										}
										else{
											res.json({
												status:true,
												data:results,
												message:"New password updated successfully"
											});
										}
									});
								}
								else{
									res.json({
										status:false,
										message:"error while encrypting"
									});
								}
							});
						}
						else
						{
							res.json({
								status:false,
								message:"old and new passwords cannot be same"
							});
						}
					}
					else
					{
						console.log("New passoword and confirm password do not match, Try again!");
						res.json({
							status:false,
							message:"New passoword and confirm password do not match, Try again!"
						});
					}
				}
				else{
					res.json({
						status:false,
						message:"Old password does not match"
					});
				}
			});
		}
		else{			
			res.json({
				status:false,
				message:"user does not exist"
			});
		}
	});	
}