requirejs.config({
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

    $('button').click(function () {
      dac.nudge($(this).data('vote'));
    });
  })
});
