/**
 * Sabrina Vega
 * 8/26/2017 
 * CEN 3031 Fall 2017
 */

var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  
  // Checks if a GET request was made before looking at URL
  if(request.method == "GET"){
    var parsedUrl = url.parse(request.url);

    // If user wants listings file then it is returned, else an error is sent
    if(parsedUrl.pathname == "/listings"){
      response.writeHead(200, {"Content-Type": "json"});
      response.write(listingData);
      response.end();
    }else {
      response.writeHead(404, "Bad gateway error");
      response.write("Bad gateway error");
      response.end();
    }
  }
};

// Sets up server
server = http.createServer(requestHandler);

/**
 * Takes listing data and inserts it to the global variable and starts the server
 */
fs.readFile('listings.json', 'utf8', function(err, data) {
  listingData = data;
  server.listen(port);
});
