
var fs = require('fs');
var pg = require('pg');


/*-----------------------------------------------------*/
/* implement the manage user route                     */
/*-----------------------------------------------------*/

exports.addHeartbeat = function(req, res, next) {

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
	// Insert the heartbeat into the database
	//-----------------------------------------------------------
	qs = prepareInsertStatement(req, res);
	console.log(qs);
	pool.query(qs, function(error, result) {
       		if (error) {
			console.log(error);
        		res.json({type: true, response:"error: insert failed"})
		}
		else
		{
        		res.json({type: true, response:"success: update successful."})
		}
	});
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
	console.log("req.body.device_name = " + req.body.device_name);

	if  (typeof req.requester_tenant_name === "undefined") {
		console.log("You must specify a tenant.");
		ERROR_CODE = 1;
        }


	return ERROR_CODE;
}

//--------------------------------------------------------------------
// Prepare Insert SQL
//--------------------------------------------------------------------

function prepareInsertStatement(req, res)
{
	qs = 'insert into stingray_heartbeat (user_id, tenant_name, device_name) values ';
	qs = qs + '( ' + '\'' + req.body.user_id + '\',';
	qs = qs +  '\'' + req.body.tenant_name + '\',';
	qs = qs + '\'' + req.body.device_name + '\')';

	return qs;
}
