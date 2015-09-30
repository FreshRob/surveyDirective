var port = Number(process.env.PORT || 8000),
    express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app);

app.use("/", express.static(__dirname + '/'));

server.listen(port, function(req, res) {

  console.log("Express server listening on port %d", port);
  
});