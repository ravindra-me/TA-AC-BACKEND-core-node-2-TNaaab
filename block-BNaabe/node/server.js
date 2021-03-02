var dir = __dirname;
var absolutePathApp = dir + '/app.js';
var absolutePathServer = dir + '/server.js';
var absolutePathHtml = dir + '/index.html';
var relativePathHtml = './index.html';
console.log(relativePathHtml);
console.log(absolutePathServer);
console.log(absolutePathApp);

var http = require('http');
let server = http.createServer(handleRequest);

// function handleRequest(req, res) {
//   let store = '';
//   req.on('data', (chunk) => {
//     store += chunk;
//   });
//   req.on('end', () => {
//     if ((req.method = 'POST' && req.url === '/')) {
//       var parseData = JSON.parse(store);
//       res.statusCode = 201;
//       res.end(parseData['captain']);
//     }
//   });
// }

// server.listen(3000, () => {
//   console.log('listening port 3000');
// });

let qr = require('querystring');

// function handleRequest(req, res) {
//   let store = '';
//   let contentType = req.headers['content-type'];
//   req.on('data', (chunk) => {
//     store += chunk;
//   });
//   req.on('end', () => {
//     if (req.method === 'POST' && contentType === 'application/json') {
//       var parseData = JSON.parse(store);
//       res.end(store);
//     } else if (
//       req.method === 'POST' &&
//       contentType === 'application/x-www-form-urlencoded'
//     ) {
//       var parseData = qr.parse(store);
//       console.log(parseData);
//       res.end(JSON.stringify(parseData));
//     }
//   });
// }

// server.listen(9000, () => {
//   console.log('listening port 9000');
// });

function handleRequest(req, res) {
  let store = '';
  let contentType = req.headers['content-type'];
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if (req.method === 'POST' && contentType === 'application/json') {
      res.setHeader('Content-Type', 'text/html');
      var parseData = JSON.parse(store);
      res.end(`<h1> ${parseData['name']} </h1> 
             <h2> ${parseData['email']}
        `);
    } else if (
      req.method === 'POST' &&
      contentType === 'application/x-www-form-urlencoded'
    ) {
      res.setHeader('Content-Type', 'text/html');
      var parseData = qr.parse(store);
      res.end(`<h1> ${parseData['name']} </h1> 
             <h2> ${parseData['email']}
        `);
    }
  });
}

server.listen(9000, () => {
  console.log('listening port 9000');
});
