var http = require('http');
let server = http.createServer(handleRequest);
let qr = require('querystring');
// function handleRequest(req, res) {
//   var contentType = req.headers['content-type'];
//   var dataList = '';
//   req.on('data', (chunk) => {
//     dataList += chunk;
//   });
//   req.on('end', () => {
//     if (contentType === 'application/json' && req.method === 'POST') {
//       var parseData = JSON.parse(dataList);
//       res.end(dataList);
//     } else if (
//       contentType === 'application/x-www-form-urlencoded' &&
//       req.method === 'POST'
//     ) {
//       let parseData = qr.parse(dataList);
//       res.end(JSON.stringify(parseData));
//     }
//   });
// }

function handleRequest(req, res) {
  var dataList = '';
  req.on('data', (chunk) => {
    dataList += chunk;
  });
  req.on('end', () => {
    if (req.url === '/json' && req.method === 'POST') {
      res.setHeader('Content-Type', 'application/json');
      res.end(dataList);
    } else if (req.url === '/form' && req.method === 'POST') {
      let parseData = qr.parse(dataList);
      res.end(JSON.stringify(parseData));
    }
  });
}

server.listen(7000, () => {
  console.log('listening at port 7000');
});
