var express = require('express'),
  app       = express(),
  server    = require('http').createServer(app),
  io        = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  socket.on('vote', function (data) {
    console.log(data);
  });
});

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(8080, function() {
  console.log("Listening on 8080");
});
