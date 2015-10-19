var AccelerometerManager = (function () {
  var instance;

  function createObject () {
    return {
      startWatchAcceleration: function (callback) {
        return navigator.accelerometer
        .watchAcceleration(callback.onSuccess,callback.onError, {frequency: 500});
      },
      stopWatchAcceleration: function (watchID) {
        if (watchID) {
          navigator.accelerometer.clearWatch();
        }
      }
    };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createObject();
      }
      return instance;
    }
  };
})();