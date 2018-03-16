

var restify = require('restify')
var fs = require('fs')
var pg = require('pg')

/*------------------------------------------------------------*/
/* Initialize the REST API server                             */
/*------------------------------------------------------------*/
var server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.fullResponse());

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
/*  Set up the documents resource                            */
/*-----------------------------------------------------------*/
server.post("/documents", controllers.documents.createDocument)
server.get("/documents/:id", controllers.documents.getDocumentById)

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


