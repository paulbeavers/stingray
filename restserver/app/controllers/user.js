
var fs = require('fs');
const { Client } = require('pg')

logger = require("../stingrayLog");


/*-----------------------------------------------------*/
/* implement the manage user route                     */
/*-----------------------------------------------------*/

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

	var client = new Client(config);
        client.connect( (err, res) => {
		if (err)
		{	
			logger.error("Could not connect to database.");
			client.end();
			res.json({type: false, response:"error: could not connect to database."})
        	}		
        	else
        	{
			logger.info("Database connection successful.");
	        }
	});

	//-------------------------------------------------------------
	// Validate input variables
	//-------------------------------------------------------------
	if (validateInput(req,res) == 0) {
		logger.info("Input arguments are valid.");
	}

	//------------------------------------------------------------
	// Check for password update
	//------------------------------------------------------------
	
	if (req.body.user_id === req.requester_user_id &&
		req.body.tenant_name == req.requester_tenant_name)
	{
		logger.info("This is a password change request, update the password.");
		qs = prepareUpdatePasswordSQL(req, res);
		client.query(qs, function(error, result) {
			if (error) {
				logger.error("Error password update failed");
				client.end();
				res.json({type: false, response:"error: update failed."});
			}
			else {
				logger.info("Password update successful.");
				client.end();
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
			client.query(qs, function(error, result) {
			        if (error) {
					qs = prepareUpdateStatement(req, res);
					client.query(qs, function(error, result) {
						if (error) {
							logger.error("Error insert and update failed.");
							client.end();
							res.json({type: false, response:"error: update and insert failed."});
						}
						else {
							logger.info("User updated successfully.");
							client.end();
							res.json({type: true, response:"success: update successful."})
						}
					});
		        	}
		        	else {
					logger.info("New user added successfully.");
					client.end();
			        	res.json({type: true, response:"success: update successful."})
				}
	                });
		}
		else {
			logger.error("User unauthorized to make this change.");
			client.end();
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

/*-----------------------------------------------------*/
/* implement the get user route                        */
/*-----------------------------------------------------*/

exports.getUsers = function(req, res, next) {
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

	var client = new Client(config);
        client.connect( (err, res) => {
                if (err)
                {
                        console.log("Could not connect to database.");
			client.end();
                        res.json({type: false, response:"error: could not connect to database."})
                }
                else
                {
                    console.log("Database connection successful.");
                }
        });

	var query_string = 'select * from stingray_users'; 
        client.query(query_string, function(error, result) {
                if (error) {
                        console.log('query failed');
			client.end();
                        res.json({type: false, response:"error: query failed."})
                }
                else {
                         if (result.rowCount === 0) {
				 client.end();
                                 res.json({type: false, response:"authorization failed."})
                         }
                        else
                        {
                                console.log(result.rows)
				client.end();
				res.json(result.rows)

                                return next();
			}
		}
	});

}


/*-----------------------------------------------------*/
/* implement the get user route                        */
/*-----------------------------------------------------*/

exports.getUserById = function(req, res, next) {

	console.log(req.params.id);

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

	var client = new Client(config);
        client.connect( (err, res) => {
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

	var query_string = 'select * from stingray_users where user_id = \'' + req.params.id + '\'';  
        client.query(query_string, function(error, result) {
                if (error) {
                        console.log('query failed');
                        res.json({type: false, response:"error: query failed."})
                }
                else {
                         if (result.rowCount === 0) {
                                 res.json({type: false, response:"record not found"})
                         }
                        else
                        {
                                console.log(result.rows)
				client.end();
				res.json(result.rows)

                                return next();
			}
		}
	});

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

