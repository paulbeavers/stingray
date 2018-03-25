
var fs = require('fs');
var pg = require('pg');

exports.manageUser = function(req, res, next) {

	/*--------------------------------------------------*/
	/* Validate the input variables                     */
	/*--------------------------------------------------*/
	var ERROR_CODE = 0;

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

	//-------------------------------------------------------------
	// Validate input variables
	//-------------------------------------------------------------
	if (validateInput(req,res) == 0) {
		console.log("Input variables are valid.");
	}

	//------------------------------------------------------------
	// Check for password update
	//------------------------------------------------------------
	
	if (req.body.user_id === req.requester_user_id &&
		req.body.tenant_name == req.requester_tenant_name)
	{
		// this is a password update, update the password.
		qs = prepareUpdatePasswordSQL(req, res);
		pool.query(qs, function(error, result) {
			if (error) {
				res.json({type: false, response:"error: update failed."});
			}
			else {
				res.json({type: true, response:"success: update successful."})
                	}
        	});
	}
	else {
		//----------------------------------------------------------
		// Check for adding a new user
		//----------------------------------------------------------

		if (req.requester_role === "SUPERADMIN" ||
			(req.requester_role === "TENANTADMIN" && 
				req.requester_tenant_name == req.body.tenant_name) && 
				(req.body.role != "SUPERADMIN")) {
			qs = prepareInsertStatement(req, res);
			pool.query(qs, function(error, result) {
			        if (error) {
					qs = prepareUpdateStatement(req, res);
					pool.query(qs, function(error, result) {
						if (error) {
							res.json({type: false, response:"error: update and insert failed."});
						}
						else {
							res.json({type: true, response:"success: update successful."})
						}
					});
		        	}
		        	else {
			        	res.json({type: true, response:"success: update successful."})
				}
	                });
		}
		else {
			res.json({type: false, response:"user not authorized to make this change"});
		}
	}
}

//---------------------------------------------------------------
// End of main function
//---------------------------------------------------------------

//---------------------------------------------------------------
// Validate input
//---------------------------------------------------------------
function validateInput(req, res)
{
	var ERROR_CODE = 0;

	// Log the input variables
	console.log("req.requester_user_id = " + req.requester_user_id);
	console.log("req.requester_role = " + req.requester_role);
	console.log("req.requester_password = " + req.requester_password);
	console.log("req.requester_tenant_name = " + req.requester_tenant_name);
	console.log("req.body.user_id = " + req.body.user_id);
	console.log("req.body.role = " + req.body.role);
	console.log("req.body.password = " + req.body.password);
	console.log("req.body.tenant_name = " + req.body.tenant_name);

	if  (typeof req.requester_tenant_name === "undefined") {
		console.log("You must specify a tenant.");
		ERROR_CODE = 1;
        }


	return ERROR_CODE;
}

//--------------------------------------------------------------------
// Prepare Password Update SQL
//--------------------------------------------------------------------
function prepareUpdatePasswordSQL(req, res)
{
	qs = 'update stingray_users set password = \'' + req.body.password + '\'';
	qs = qs + ' where user_id = \'' + req.requester_user_id + '\' and ';
	qs = qs + ' tenant_name = \'' + req.requester_tenant_name + '\'';

	return qs;
}

function prepareInsertStatement(req, res)
{
	qs = 'insert into stingray_users (user_id, user_type, tenant_name, password) values ';
	qs = qs + '( ' + '\'' + req.body.user_id + '\',';
	qs = qs + '\'' + req.body.role +  '\',';
	qs = qs +  '\'' + req.body.tenant_name + '\',';
	qs = qs + '\'' + req.body.password + '\')';

	return qs;
}

function prepareUpdateStatement(req, res)
{
	qs = 'update stingray_users set password = \'' + req.body.password + '\'';
        qs = qs + ' where user_id = \'' + req.body.user_id + '\' and ';
        qs = qs + ' tenant_name = \'' + req.body.tenant_name+ '\'';

        return qs;
}

