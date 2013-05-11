var express = require('express'),
  app       = express(),
  server    = require('http').createServer(app),
  mongoose  = require('mongoose'),
  io        = require('socket.io').listen(server);

mongoose.connect('mongodb://localhost/pace');

io.sockets.on('connection', function (socket) {
  socket.on('vote', function (data) {
    socket.broadcast.emit('vote', data);
    console.log(data);
  });
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index', {environment: app.settings.env});
});

app.get('/history', function(req, res) {
  res.render('history');
});

server.listen(8080, function() {
  console.log("Express server listening in %s mode", app.settings.env);
});
