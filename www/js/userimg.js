var pictureSource;
var destinationType;
var localStorage;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
   pictureSource = navigator.camera.PictureSourceType;
   destinationType = navigator.camera.DestinationType;
   localStorage = window.localStorage;

   var userimgData = localStorage.getItem("userimg");
   if (userimgData == null) {
      userimgData = "img/userimg-default.jpg";
   }
   $("#userimg").attr("src", userimgData);
}

function capturePhotoEdit() {
   navigator.camera.getPicture(onPhotoURISuccess, onFail, {
      quality: 80,
      allowEdit:true, 
      destinationType: destinationType.DATA_URL
   });
}

function getPhoto() {
   navigator.camera.getPicture(onPhotoURISuccess, onFail, {
      quality:80, 
      destinationType: destinationType.DATA_URL, 
      sourceType: pictureSource.PHOTOLIBRARY
   });
}

function onPhotoURISuccess(imageData) {
   localStorage.setItem("userimg", "data:image/jpeg;base64," + imageData);
   $("#userimg").attr("src", "data:image/jpeg;base64," + imageData);
}

function onFail(message) {
   console.log("Camera error: " + message);
}

$("#userimg-camerabtn").on("tap", capturePhotoEdit);
$("#userimg-storagebtn").on("tap", getPhoto);