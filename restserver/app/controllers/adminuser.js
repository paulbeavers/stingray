
var fs = require('fs');

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
	var ERROR_TEXT = "Operation successful";

	//-------------------------------------------------------------------------
	// if the passord file exists and currentadminuser and currentadminpassword
	// are not supplied. Then this is an error.
	//-------------------------------------------------------------------------
	
	if (fs.existsSync(PASSWD_FILE))
	{
		// This is a change password request.  Make sure the old user name and password were provided 

		if (  (typeof CURRENTADMINUSER === "undefined") ||
		      (typeof CURRENTPASSWORD === "undefineed") || 
		      (typeof ADMINUSER === "undefined") ||
		      (typeof PASSWORD === "undefined"))
		{
		 	ERROR_CODE = 1;
			ERROR_TEXT = "You must provide currentadminuser, currentpassword, adminuser, password to change admin password.";
		}
		else
		{
			ERROR_CODE = 0;
			var contents = fs.readFileSync(PASSWD_FILE);
			var jsonContent = JSON.parse(contents);

			if (CURRENTADMINUSER === jsonContent.adminuser && CURRENTPASSWORD === jsonContent.password)
			{
				ERROR_CODE = 0;
			}
			else
			{
				ERROR_CODE = 2;
				ERROR_TEXT = "Invalid current username or current password provided.";
			}

		}
	}
	else
	{
		// this is the first time the account is being set.  Make sure the username and password
		// are provided.

		if (  (typeof ADMINUSER === "undefined") ||
		      (typeof PASSWORD === "undefineed") )
		{
			ERROR_CODE = 3;
			ERROR_TEXT = "You must provide both username and password.";
		}
	}

	if (ERROR_CODE === 0)
	{
		// we have valid input parameters.  Make the change.

		JsonData = {"adminuser":ADMINUSER, "password":PASSWORD};
		var str = JSON.stringify(JsonData);

		fs.writeFile(PASSWD_FILE, str, function(err) {
		    if(err) 
		    {
			    ERROR_CODE = 4;
			    ERROR_TEXT = "Internal error writing admin password file";
	            }
		}); 
		console.log(ERROR_TEXT)
        	res.json({type: true, response:ERROR_TEXT})
	}
	else
	{
		// we have an error situation, report the error.
		console.log(ERROR_TEXT)
        	res.json({type: false, response:ERROR_TEXT})
	}
}

