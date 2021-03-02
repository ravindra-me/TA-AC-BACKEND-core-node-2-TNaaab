var http = require('http');
var server = http.createServer(handleRequest);
function handleRequest(req, res) {
  let listData = '';
  if (req.method === 'POST' && req.url === '/') {
    req.on('data', (chunk) => {
      listData = listData + chunk;
    });
    req.on('end', () => {
      console.log(listData);
      res.write(listData);
      res.end();
    });
  }
}

server.listen(3456, () => {
  console.log('listening with port is 3456');
});
