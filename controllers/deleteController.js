var connection=require('../config');

module.exports.del=function(req,res){
	var name=req.body.name;
	var email=req.body.email;

	connection.query('SELECT * FROM users WHERE name=? OR email=?',[name,email],function(error,results,fields){
		if((!error)&&(results.length>0)){
			connection.query('DELETE FROM users WHERE name=? OR email=?',[name,email],function(err,result){
				if(!err)
				{			
					res.json({
						status:true,
						data:result,
						message:"User Account deleted successfully"
					});					
				}				
			});
		}
		else{
			res.json({
				status:false,
				message:"please enter the correct details"
			});
		}
	});	
}