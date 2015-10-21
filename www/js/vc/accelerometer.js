(function () {
  var accelerometerManager = AccelerometerManager.getInstance();
  var watchID;
  var steps = 0;
  var delta = 0.110;

  $(document).on("pageinit", "#accelerometer", function (e) {
    e.preventDefault();

    $("#startWatchAcceleration").on("tap", function (e) {
      e.preventDefault();

      enableStartWatchAccelerationButton(false);
      var callback = {};

      callback.onSuccess = onSuccess;
      callback.onError   = onError;

      watchID = accelerometerManager.startWatchAcceleration(callback);
    });

    $("#stopWatchAcceleration").on("tap", function (e) {
      e.preventDefault();
      enableStartWatchAccelerationButton(true);
      accelerometerManager.stopWatchAcceleration(watchID);
    });

    initPage();
  });

  $(document).on("pagebeforehide",  "#accelerometer", function(e) {                 
    accelerometerManager.stopWatchAcceleration(watchID);
    enableStartWatchAccelerationButton(true);
  });

  function initPage() {
    $("#stopWatchAcceleration").closest('.ui-btn').hide();     
  }
    
  function onSuccess(acceleration) {
    stepForce = calculateSteps(acceleration);
    $("#acceleration").html("Acceleration X: " + acceleration.x + "<br/>" +
      "Acceleration Y: " + acceleration.y + "<br/>" +
      "Acceleration Z: " + acceleration.z + "<br/>" +
      "Pasos: " + steps + "<br/>" +
      "StepForce: " + stepForce + "<br/>" +
      "Timestamp: "      + acceleration.timestamp + "<br/>");    
  }
    
  function onError() {
    $("#acceleration").html("An error occurs during watching acceleration.");
  }  

  function calculateSteps(acceleration) {
    stepForce = ((acceleration.x * acceleration.x) + (acceleration.y * acceleration.y) + 
                (acceleration.z * acceleration.z)) / (9.78 * 9.78);
    var negRange = 1 - delta;
    var posRange = 1 + delta;
    if (stepForce >= 1.021) {
      steps++;
    }
    return stepForce;
  }
    
  function enableStartWatchAccelerationButton(enable) {
    if (enable) {
      $("#startWatchAcceleration").button("enable");
      $("#stopWatchAcceleration").closest('.ui-btn').hide(); 
    } else {
      $("#startWatchAcceleration").button("disable");
      $("#stopWatchAcceleration").closest('.ui-btn').show(); 
    }
    
    $("#startWatchAcceleration").button("refresh");
  }
})();