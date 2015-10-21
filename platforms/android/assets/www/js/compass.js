// Global variable
var img = null,
  compassManager = CompassManager.getInstance(),
  watchID = null,
  needle = null,
  ctx = null,
  degrees = 0;

function clearCanvas() {
   // clear canvas
  ctx.clearRect(0, 0, 200, 200);
}

function draw() {

  clearCanvas();

  // Draw the compass onto the canvas
  ctx.drawImage(img, 0, 0);

  // Save the current drawing state
  ctx.save();

  // Now move across and down half the 
  ctx.translate(100, 100);

  // Rotate around this point
  ctx.rotate(degrees * (Math.PI / 180));

  // Draw the image back and up
  ctx.drawImage(needle, -100, -100);

  // Restore the previous drawing state
  ctx.restore();
  callback.onSuccess = onSuccess;
  callback.onError = onError;
  watchID = compassManager.startWatchHeading(callback);

  // Increment the angle of the needle by 5 degrees
  // degrees += 5;
}

function imgLoaded() {
  // Image loaded event complete.  Start the timer
  setInterval(draw, 100);
}

function init() {
  // Grab the compass element
  var canvas = document.getElementById('compass');

  // Canvas supported?
  if (canvas.getContext('2d')) {
    ctx = canvas.getContext('2d');

    // Load the needle image
    needle = new Image();
    needle.src = 'assets/needle.png';

    // Load the compass image
    img = new Image();
    img.src = 'assets/compass.png';
    img.onload = imgLoaded;
  } else {
    alert("Canvas not supported!");
  }
}

function onSuccess(heading) {
  console.log(degrees);
  $("#compassHeading").html("Heading: " + heading.magneticHeading);    
  degrees(heading.magneticHeading);
  }
    
function onError(error) {
  $("#compassHeading").html("An error occurs during watch heading: " + error.code);
} 