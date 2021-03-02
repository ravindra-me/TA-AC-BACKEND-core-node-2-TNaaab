console.log('./client/index.js');
console.log(__dirname + '/client/index.js');

let http = require('http');
let server = http.createServer(handleRequest);
let fs = require('fs');
let qu = require('querystring');
function handleRequest(req, res) {
  let store = '';
  let dataFormate = req.headers['content-type'];
  req.on('data', (chuck) => {
    store += chuck;
  });
  req.on('end', () => {
    if (req.url === '/form' && req.method === 'GET') {
      res.setHeader('Content-Type', 'text/html');
      fs.createReadStream('./form.html').pipe(res);
    } else if (req.method === 'POST' && req.url === '/form') {
      res.setHeader('Content-Type', 'text/html');
      let parseData = qu.parse(store);
      res.end(`
            <h1>${parseData.name}</h1>
            <h2>${parseData.email}</h2> 
            <h2>${parseData.age}</h2>`);
    }
  });
}

server.listen(5678, () => {
  console.log('listen port is 5678');
});
