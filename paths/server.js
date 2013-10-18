var http = require("http");
var fs = require('fs'); // filesystem.
var path = require('path'); // used for traversing your OS.
var url = require('url');
//var io = require('socket.io');
// add to your hearts' content.
var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"
};

var server = http.createServer(function(req,res) {

 	var headers = {};
 	  headers["Access-Control-Allow-Origin"] = "*";
 	  headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
 	  //headers["Access-Control-Allow-Credentials"] = true;
 	  headers["Access-Control-Max-Age"] = '86400'; // 24 hours
 	  headers["Access-Control-Allow-Headers"] = "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept";
 	  res.writeHead(200, headers);
 	  //res.end();

	var fileToLoad;

	// you could also convert a url to a filename like so if you wanted
	if(req.url == "/") {
		fileToLoad = "./index.html";
	}
	else {
		fileToLoad = "." + url.parse(req.url).pathname;
	}

	var fileBytes;
	var httpStatusCode = 200;

	// check to make sure a file exists...
	fs.exists(fileToLoad,function(doesItExist) {

		// if it doesn't exist lets make sure we load error404.html
		// if(!doesItExist) {
		// 	httpStatusCode = 404;
		// 	fileToLoad = "error404.html";
		// }

		fileBytes = fs.readFileSync(fileToLoad);
		var mimeType = mimeTypes[path.extname(fileToLoad).split(".")[1]]; // complicated, eh?

		res.writeHead(httpStatusCode,{'Content-type':mimeType});
		res.end(fileBytes);
	});

});

server.listen(8080, '127.0.0.1');

// var socketServer = io.listen(server);
// socketServer.sockets.on('connection',function(socket){
	
// });