var http = require('http');

http.createServer(function (req, res) {
  res.write("To vivo!");
  res.end();
}).listen(8080);
