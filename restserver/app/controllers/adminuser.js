
var fs = require('fs');
var pg = require('pg');

exports.createAdminPassword = function(req, res, next) {

	/*--------------------------------------------------*/
	/* Validate the input variables                     */
	/*--------------------------------------------------*/
	var DATA_DIR = process.env.DATA_DIR;
	var PASSWD_FILE = DATA_DIR + "/adminuser";
	var ERROR_CODE = 0;
	var ADMINUSER = req.body.adminuser;
	var PASSWORD = req.body.password;
	var CURRENTADMINUSER = req.body.currentadminuser;
	var CURRENTPASSWORD = req.body.currentpassword;
	var TENANT = req.body.tenant;
	var ERROR_TEXT = "Operation successful";

	console.log("-------------");
	console.log(req.usertype);
	console.log("-------------");


	/*---------------------------------------------------*/
	/* Set up the connection to the database             */
	/*---------------------------------------------------*/

	const config = {
		            user: process.env.DB_USER,
		            database: process.env.DB_DATABASE,
		            password: process.env.DB_PASSWORD,
		            port: process.env.DB_PORT,
		            host: process.env.DB_HOSTNAME
	};

	var pool = new pg.Pool(config);
	pool.connect(function(err, client, done) {
		if (err)
		{	
	    		console.log("Could not connect to database.");
			res.json({type: false, response:"error: could not connect to database."})
        	}		
        	else
        	{
        	    console.log("Database connection successful.");
	        }
	});

	if  (typeof TENANT === "undefined") 
	{
		console.log("You must specify a tenant.");
		res.json({type: false, response:"You must specify a tenant."})
		return;
	}

	//-------------------------------------------------------------------------
	// if the passord file exists and currentadminuser and currentadminpassword
	// are not supplied. Then this is an error.
	//-------------------------------------------------------------------------
	var query_string = 'select * from stingray_users where user_type = \'ADMIN\' and tenant_name = ' + '\'' + TENANT + '\'';
	pool.query(query_string, function(error, result) {
	    	if (error) 
		{
			console.log('query failed');
			res.json({type: false, response:"error: query failed."})
		}
		else
		{
			/*---------------------------------------------*/
			/* check to see if this is a change or add     */
			/*---------------------------------------------*/
			
			var change = 0;
			if (result.rowCount === 0) {
				change = 0;
			}
			else {
				change = 1;
			}

			if (change === 1) {
				// 
				// This is a change
				//
				if (  (typeof CURRENTADMINUSER === "undefined") ||
				                      (typeof CURRENTPASSWORD === "undefineed") ||
				                      (typeof ADMINUSER === "undefined") ||
				                      (typeof TENANT === "undefined") ||
				                      (typeof PASSWORD === "undefined")) {
				                        ERROR_CODE = 1;
				                        ERROR_TEXT = "You must provide all fields to change admin password.";
							 res.json({type: false, response:"You must provide all fields to change admin password."})
			        }
				else {
					//
					// This is a change and we have the right fields.
					// Now make sure the password is valid.
					//
					console.log(result.rows[0]);
					if (CURRENTADMINUSER == result.rows[0].user_id &&
						CURRENTPASSWORD === result.rows[0].password) {
						//
						// user is valid perform the update
						//
						query_string = 'update stingray_users set user_id = \'' + ADMINUSER + '\',';
						query_string = query_string + ' password = \'' + PASSWORD + '\'';
						query_string = query_string + ' where user_type = \'ADMIN\' and tenant_name = \'' + TENANT + '\'';
						console.log(query_string);
						pool.query(query_string, function(error, result) {
							if (error) {
								console.log("update failed");
								res.json({type: false, response:"error: update failed."})
							}
							else {
						      		console.log("update successful");
								res.json({type: true, response:"success: update successful."})
							}
					        });
					}
					else {
						console.log("Invalid user specified.");
						res.json({type: false, response:"error: invalid user specified."})
					}
				}


			}
			else
			{
				//
				// This is an add
				//
				if (  (typeof ADMINUSER === "undefined") ||
					(typeof TENANT === "undefined") ||
					                      (typeof PASSWORD === "undefineed") ) {
					                        ERROR_CODE = 3;
					                        ERROR_TEXT = "You must provide both username and password.";
		                }
				else {
					query_string = 'insert into stingray_users (user_id, user_type, tenant_name, password) values ';
					query_string = query_string + '( ' + '\'' + ADMINUSER + '\',';
					query_string = query_string + '\'ADMIN\',';
					query_string = query_string + '\'' + TENANT + '\',';
					query_string = query_string + '\'' + PASSWORD + '\')';
					console.log(query_string);
					pool.query(query_string, function(error, result) {
			         		if (error) {
							console.log("insert failed");
							res.json({type: false, response:"error: insert failed."})
						}	
		            			else {
							console.log("insert successful");
							res.json({type: true, response:"success: insert succeeded."})
						}
					});
				}
			}
		}


	});
	
}

