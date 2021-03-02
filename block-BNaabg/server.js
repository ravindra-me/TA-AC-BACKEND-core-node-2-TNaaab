let http = require('http');
let server = http.createServer(handleRequest);
let fs = require('fs');
let path = require('path');
const { error } = require('console');
let userDir = path.join(__dirname, '/users/');

let url = require('url');

console.log(userDir);

function handleRequest(req, res) {
  var store = '';
  let parsedUrl = url.parse(req.url, true);
  console.log(parsedUrl);
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if (req.method === 'POST' && req.url === '/users') {
      let dataPase = JSON.parse(store);
      fs.open(userDir + dataPase.username + '.json', 'wx', (err, fd) => {
        if (err) {
          console.log(err);
        }
        fs.writeFile(fd, store, (err) => {
          if (err) {
            console.log(err);
          }
          fs.close(fd, (err) => {
            if (err) {
              console.log(err);
            }
            res.end(`${dataPase.username} successfully created`);
          });
        });
      });
    } else if (req.method === 'GET' && parsedUrl.pathname === '/users') {
      fs.readFile(
        path.join(userDir, parsedUrl.query['username']),
        (err, user) => {
          if (err) {
            console.log(err);
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(user);
        }
      );
    } else if (req.method === 'DELETE' && parsedUrl.pathname === '/users') {
      fs.unlink(
        path.join(userDir, parsedUrl.query['username']),
        (err, user) => {
          if (err) {
            console.log(err);
          }
          res.end('successfully delete');
        }
      );
    } else if (req.method === 'PUT' && parsedUrl.pathname === '/users') {
      var username = parsedUrl.query['username'];
      fs.open(userDir + username + '.json', 'r+', (err, fd) => {
        if (err) return console.log(err);
        fs.ftruncate(fd, (err) => {
          if (err) return console.log(err);
          fs.writeFile(fd, store, (err) => {
            if (err) return console.log(err);
            fs.close(fd, () => {
              res.end(`${username} is updated`);
            });
          });
        });
      });
    }
  });
}

server.listen(3000, () => {
  console.log('listing and port is 3000');
});
