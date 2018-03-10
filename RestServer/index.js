

var restify = require('restify')
var fs = require('fs')

var server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.fullResponse());

server.post("/documents", createDocument)
server.get("/documents/:id", getDocumentById)

function createDocument(req, res, next)
{
	console.log("createDocument")
	console.log(req.body)
	res.json({type: true, response:"createDocument succcess"})
}

function getDocumentById(req, res, next)
{
	console.log("createDocument")
	res.json({type: true, response:"createDocument succcess"})
}

var port = process.env.PORT || 3000;
server.listen(port, function (err) {
	if (err)
	        console.error(err)
	else
	        console.log('App is ready at : ' + port)
})


