

var restify = require('restify')
var fs = require('fs')
var pg = require('pg')

/*------------------------------------------------------------*/
/* Initialize the REST API server                             */
/*------------------------------------------------------------*/
var server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.fullResponse());
server.use(restify.plugins.authorizationParser());

/*-----------------------------------------------------------*/
/* Test the connection to the database                       */
/*-----------------------------------------------------------*/
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
		process.exit(1);
	}
	else
	{
		console.log("Database connection successful.");
	}
});

/*-----------------------------------------------------------*/
/* Load the controllers from the controllers directory       */
/*-----------------------------------------------------------*/
var controllers = {}
controllers_path = process.cwd() + '/controllers'
fs.readdirSync(controllers_path).forEach(function (file) {
	if (file.indexOf('.js') != -1) {
	    controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
	}
})

/*-----------------------------------------------------------*/
/*  Set up the admin user resource                           */
/*-----------------------------------------------------------*/
server.post("/adminuser", controllers.adminuser.createAdminPassword)

/*-----------------------------------------------------------*/
/*  Set up the admin user resource                           */
/*-----------------------------------------------------------*/
server.post("/user", controllers.user.manageUser)

/*-----------------------------------------------------------*/
/*  Set up the documents resource                            */
/*-----------------------------------------------------------*/
server.post("/documents", controllers.documents.createDocument)
server.get("/documents/:id", controllers.documents.getDocumentById)

/*------------------------------------------------------------*/
/* Add handler to check the user account                      */
/*------------------------------------------------------------*/
server.use(function authenticate(req, res, next) {
	console.log("authrnticating");
	var USERNAME = req.authorization.basic.username;
	var PW = req.authorization.basic.password;
	console.log(req.authorization.basic.username);
	console.log(req.authorization.basic.password);
	console.log("authorizing");
	var query_string = 'select * from stingray_users where user_id = ' + '\'' + req.authorization.basic.username + '\' and ';
	query_string = query_string + 'password = ' + '\'' + req.authorization.basic.password + '\'';
	console.log(query_string);
	pool.query(query_string, function(error, result) {
		if (error) {
			console.log('query failed');
	    		res.json({type: false, response:"error: query failed."})
	        }
                else {
			 if (result.rowCount === 0) {
				 res.json({type: false, response:"authorization failed."})
			 }
			else
			{
				req.requester_user_id = req.authorization.basic.username;
				req.requester_role = result.rows[0].user_type;
				req.requester_tenant_name = result.rows[0].tenant_name;
				req.requester_password = req.authorization.basic.password;

				console.log("req.requester_user_id = " + req.requester_user_id);
				console.log("req.requester_role = " + req.requester_role);
				console.log("req.requester_password = " + req.requester_password);
				console.log("req.requester_tenant_name = " + req.requester_tenant_name);
				console.log("req.body.user_id = " + req.body.user_id);
				console.log("req.body.role = " + req.body.role);
				console.log("req.body.password = " + req.body.password);
				console.log("req.body.tenant_name = " + req.body.tenant_name);



				return next();
			}
		}
	});
});

/*---------------------------------------------------------------*/
/*  Start the REST API server                                    */
/*---------------------------------------------------------------*/
var port = process.env.PORT || 3000;
server.listen(port, function (err) {
	if (err)
	        console.error(err)
	else
	        console.log('App is ready at : ' + port)
})


