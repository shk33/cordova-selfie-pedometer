(function () {
  var accelerometerManager = AccelerometerManager.getInstance();
  var watchID;
  var enabled = false;
  var calStep = 0.044;
  var steps = 0;
  var calories = 0;
  var delta = 0.110;

  $(document).on("pageinit", "#features", function (e) {
    e.preventDefault();

    $("#startWatchAcceleration").on("tap", function (e) {
      e.preventDefault();
      steps = 0;
      enabled = false;
      enableStartWatchAccelerationButton(enabled);
      var callback = {};

      callback.onSuccess = onSuccess;
      callback.onError   = onError;

      watchID = accelerometerManager.startWatchAcceleration(callback);
    });

    $("#stopWatchAcceleration").on("tap", function (e) {
      e.preventDefault();
      enabled = true;
      steps = 0;
      enableStartWatchAccelerationButton(enabled);
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
    calories = calculateCalories();
    if (!enabled) {
      $("#acceleration").html("<div class='nightly-alert nightly-alert-info'><i class='fa fa-2x fa-heartbeat'></i><p>"+
        "Pasos Caminados: " + steps + "</p></div>" +
        "<div class='nightly-alert nightly-alert-info'><i class='fa fa-2x fa-fire'></i><p>"+
        "Calorias Quemadas: " + calories.toFixed(2) + "</p></div>"
      ); 
    }
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

  function calculateCalories() {
    return steps*calStep;
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