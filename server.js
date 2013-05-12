var express = require('express'),
  app       = express(),
  server    = require('http').createServer(app),
  mongoose  = require('mongoose'),
  io        = require('socket.io').listen(server),
  dac_truth = new (require('decaying-accumulator'))(10000);

mongoose.connect('mongodb://localhost/pace');

io.sockets.on('connection', function (socket) {
  socket.on('vote', function (data) {
    dac_truth.nudge(data);
    socket.broadcast.emit('vote', data);
    // TODO: log dac_truth.currentValue(), timestamp, and data
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

app.get('/status.json', function(req, res)  {
  res.set('Content-Type', 'application/json');
  dac_truth.applyDecay(); // update the stats
  res.send(JSON.stringify({
    val: dac_truth.val,
    decaySpeed: dac_truth.decaySpeed,
    maxValueSeen: dac_truth.maxValueSeen
  }));
});

server.listen(8080, function() {
  console.log("Express server listening in %s mode", app.settings.env);
});
