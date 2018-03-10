

var restify = require('restify')
var fs = require('fs')

var server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.fullResponse());

controllers_path = process.cwd() + '/controllers'


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


