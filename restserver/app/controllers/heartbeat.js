

var fs = require('fs');

const { Client } = require('pg')

logger = require("../stingrayLog");

/*-----------------------------------------------------*/
/* implement the manage user route                     */
/*-----------------------------------------------------*/

exports.addHeartbeat = function(req, res, next) {
	logger.info("Entering function heartbeat.addHeartbeat()");

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
			logger.error("Error could not connect to database.");
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

		logger.info("Input variables are valid.");
	}

	//------------------------------------------------------------
	// Insert the heartbeat into the database
	//-----------------------------------------------------------
	qs = prepareInsertStatement(req, res);
	logger.info(qs);
	client.query(qs, function(error, result) {
       		if (error) {
			logger.error("Heartbeat insert failed.");
			client.end();
        		res.json({type: true, response:"error: insert failed"})
		}
		else
		{
			logger.info("Heartbeat insert successful.");
			client.end();
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

	if  (typeof req.requester_tenant_name === "undefined") {
		logger.error("You must specify a tenant.");
		ERROR_CODE = 1;
        }


	return ERROR_CODE;
}

//--------------------------------------------------------------------
// Prepare Insert SQL
//--------------------------------------------------------------------

function prepareInsertStatement(req, res)
{
	qs = 'insert into stingray_heartbeat (user_id, tenant_name, message_text, device_name) values ';
	qs = qs + '( ' + '\'' + req.requester_user_id + '\',';
	qs = qs +  '\'' + req.body.tenant_name + '\',';
	qs = qs +  '\'' + req.body.message_text + '\',';
	qs = qs + '\'' + req.body.device_name + '\')';

	return qs;
}

