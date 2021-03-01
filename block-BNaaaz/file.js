var http = require('http');
var server = http.createServer(handleRequest);
var path = require('path');
var fs = require('fs');
function handleRequest(req, res) {
  console.log(path.join(__dirname, '/readme.txt'));
  fs.createReadStream(path.join(__dirname, '/readme.txt')).pipe(res);
}

server.listen(5000, () => {
  console.log('listening by the post 5000');
});
