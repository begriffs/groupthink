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
  $('body').append('<div>' + typeof DecayingAccumulator + '</div>')
});
