var express = require('express'),
  app       = express(),
  server    = require('http').createServer(app),
  io        = require('socket.io').listen(server),
  stylus    = require('stylus');

io.sockets.on('connection', function (socket) {
  socket.on('vote', function (data) {
    socket.broadcast.emit('vote', data);
    console.log(data);
  });
});

// This must be BEFORE other app.use
app.use(stylus.middleware({
  debug: true,
  src: __dirname + '/views',
  dest: __dirname + '/public',
  compile: function (str, path) {
    return stylus(str)
      .set('warn', true)
      .set('paths', ['stylus'])
      .set('compress', true);
  }
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index', {environment: app.settings.env});
});

server.listen(8080, function () {
  console.log("Express server listening in %s mode", app.settings.env);
});
