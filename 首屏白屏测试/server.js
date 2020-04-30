const http = require( 'http');
const url = require( "url");
const fs =require( "fs");
const querystring = require("querystring");

const hostname  = "127.0.0.1";

const port = 9111;




var server = http.createServer( function(request, response){
	console.log("create server");
});

server.on("request" , function(request , response){
	console.log("server on request");
	let parsedUrl = url.parse(request.url , true);
	
	console.log("url in request",request.url);
	console.log("pathname in url parse" , parsedUrl.pathname);
	console.log("search in url parse" , JSON.stringify(parsedUrl.query));
	console.log("request method" , request.method);

	let query;
	if(request.method=='GET'){
		query = parsedUrl.query;
	}else if(request.method=="POST"){
		query = getPostQuery(request);
	}

	if(parsedUrl.pathname=='/' ){//index page
		// fs.readFile('./style.html' ,function(err,data){
		fs.readFile('./test.html' ,function(err,data){
			if(err){
				response.writeHead(500,{"Content-Type":"text/plain"});
				response.end("error");
			}else{
				response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
				response.write(data);
				response.end();
			}
		});
	}
	else{
		

		setTimeout(()=>{sendFile('.'+parsedUrl.pathname , response)} ,10000);
	}
	
});

function sendFile(filepath , response){
	fs.readFile(filepath ,function(err,data){
			if(err){
				response.writeHead(500,{"Content-Type":"text/plain"});
				response.end("error");
			}else{
				if(/.svg$/.test(filepath)){
					response.writeHead(200, {"Content-Type": "image/svg+xml;charset=utf-8"});
				}
				// else response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
				response.write(data);
				response.end();
			}
		});
}
function getPostQuery(req){
	let post = '';
	// console.log("in getPostQuery");
	req.on('data' , chunk => {
		post += chunk;
	   // console.log("ondata",post);

	});
	//do not do something for state 'close'
	req.on('end' , ()=>{
		post = JSON.parse(post);
	console.log("onend",post);

		return post
	});
}
server.listen(port);

console.log("listening port ",port);