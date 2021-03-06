var express = require('express'),
  app       = express(),
  server    = require('http').createServer(app),
  stylus    = require('stylus'),
  io        = require('socket.io').listen(server),
  num_users = 0,
  dac_truth = new (require('decaying-accumulator'))({decaySpeed: 40000, currentScale: 4, cooldownSpeed: 10000});

io.sockets.on('connection', function (socket) {
  num_users += 1;
  socket.broadcast.emit('audience_change', num_users);
  socket.emit('audience_change', num_users);

  socket.on("disconnect", function () {
    num_users -= 1;
    socket.broadcast.emit('audience_change', num_users);
    socket.emit('audience_change', num_users);
  });

  socket.on('vote', function (data) {
    data = data / (Math.abs(data) || 1);
    dac_truth.nudge(data);
    socket.broadcast.emit('vote', data);
    // TODO: log dac_truth.currentValue(), timestamp, and data
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
      .set('paths', ['views/style'])
      .set('compress', true);
  }
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index', {environment: app.settings.env});
});

app.get('/history', function (req, res) {
  res.render('history');
});

app.get('/status.json', function (req, res) {
  res.set('Content-Type', 'application/json');
  dac_truth.applyDecay(); // update the stats
  res.send(JSON.stringify(dac_truth));
});

server.listen(8080, function () {
  console.log("Express server listening in %s mode", app.settings.env);
});
