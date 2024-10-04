var http = require("http");
var events = require("events");


http.createServer(function(request, response) {
	response.writeHead(200, {"Content-Type": "text/plain"});

	response.end("Hello World\n");
}).listen(8081);

console.log("Server running at http://localhost:8081");

// Create an eventEmitter object
var eventEmitter = new events.EventEmitter();

// Create an event handler as follows
var connectHandler = function connected() {
	console.log("connection successful.");
	eventEmitter.emit("data_received");
}

// Bind the connection event with the handler
eventEmitter.on('connection', connectHandler);
eventEmitter.on('data_received', function(){
	console.log('data received successfully.');
});

eventEmitter.emit('connection');
console.log('Program ended.');

console.log (events.EventEmitter.listenerCount(eventEmitter, 'connection'));

console.log(__filename);
console.log(__dirname);

function printHello(){
   console.log( "Hello, World!");
}

function printGoodnight(){
   console.log( "Goodnight, World!");
}
var t = setTimeout(printHello, 2000);
//clearTimeout(t);

setInterval(printGoodnight, 2000);
