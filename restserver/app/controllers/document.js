
var fs = require('fs');
var pg = require('pg');


/*-----------------------------------------------------*/
/* implement the manage user route                     */
/*-----------------------------------------------------*/

exports.addDocument = function(req, res, next) {

	/*--------------------------------------------------*/
	/* Validate the input variables                     */
	/*--------------------------------------------------*/
	console.log("------------ body -------------");
	console.log(req.body);
	console.log("------------- end body --------");
	res.json({type: true, response:"document loaded"})


}

//---------------------------------------------------------------
// End of main function
//---------------------------------------------------------------


