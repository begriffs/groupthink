requirejs.config({
  shim: {
    'socket.io': {
      exports: 'io'
    }
  },
  paths: {
    jquery: [
      'https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min',
      'cdn-fallback/jquery'
    ],
    'socket.io': [
      'https://cdnjs.cloudflare.com/ajax/libs/socket.io/0.9.10/socket.io.min',
      'cdn-fallback/socket.io'
    ],
    'decaying-accumulator': 'decaying-accumulator/DecayingAccumulator'
  }
});

require(['jquery', 'socket.io', 'decaying-accumulator'], function ($, io, DecayingAccumulator) {
  $(function () {
    var dac = new DecayingAccumulator(10000);
    window.setInterval(
      function () {
        $('meter').val(dac.currentValue());
      },
      50
    );

    var socket = io.connect('http://' + window.location.hostname);
    socket.on('vote', function (data) {
      dac.nudge(data);
    });

    $('button').click(function () {
      var vote = $(this).data('vote');
      socket.emit('vote', vote);
      dac.nudge(vote);
    });
  });
});
