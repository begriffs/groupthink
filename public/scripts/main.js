requirejs.config({
  shim: {
    'socket.io': {
      exports: 'io'
    }
  },
  paths: {
    /**
      This library has issues being used as a shim. The eve dependency was not appearing. Beyond that
      it has a crazy amount of methods leaked into global scope. Changed lib to be an amd module.
    */
    'justgage': 'justgage',

    /**
      Not pulled into through bower because raphael amd compliance was fixed this week. Raphale opted not
      to increase its release number yet so it is still not an official release. Bower is not receiving 
      the update until it is official.
    */
    'eve': 'eve',
    'raphael': 'raphael',
    'jquery': 'components/jquery/jquery',
    'socket.io': 'components/socket.io-client/dist/socket.io',
    'decaying-accumulator': 'components/decaying-accumulator/DecayingAccumulator'
  }
});

require(['jquery', 'socket.io', 'decaying-accumulator', 'justgage'], function ($, io, DecayingAccumulator, JustGage) {

  // Allows for anchor active state in css on mobile devices
  document.addEventListener("touchstart", function () {}, true);

  var speedGage = new JustGage({
    id: "gauge",
    value: 0,
    min: -1,
    max: 1,
    hideMinMax: true,
    textRenderer: function (gageValue) {
      var i,
        label = "";
      for (i = 0; i < this.customSectors.length; i += 1) {
        if (gageValue > this.customSectors[i].lo && gageValue <= this.customSectors[i].hi) {
          label = this.customSectors[i].label;
          break;
        }
      }
      return label;
    },
    customSectors: [
      {
        color : "#ff0000",
        lo : -1,
        hi : -0.8,
        label: 'way too fast'
      }, {
        color : "#fa9001",
        lo : -0.8,
        hi : -0.2,
        label: 'too fast'
      }, {
        color : "#00ff00",
        lo : -0.2,
        hi : 0.2,
        label: 'ok'
      }, {
        color : "#fa9001",
        lo : 0.2,
        hi : 0.8,
        label: 'too slow'
      }, {
        color : "#ff0000",
        lo : 0.8,
        hi : 1,
        label: 'way too slow'
      }
    ],
    title: "Speed"
  });

  $(function () {
    var dac;
    $.getJSON('/status.json', function (data) {
      dac = new DecayingAccumulator(data);
      window.setInterval(
        function () {
          speedGage.refresh(dac.currentValue());
        },
        50
      );
    });

    var socket = io.connect('http://' + window.location.hostname);
    socket.on('vote', function (data) {
      dac.nudge(data);
    });

    $('a[data-vote]').click(function (e) {
      e.preventDefault();

      var vote = $(this).data('vote');
      socket.emit('vote', vote);
      dac.nudge(vote);
    });
  });
});
