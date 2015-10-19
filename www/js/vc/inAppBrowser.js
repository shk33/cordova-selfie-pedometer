(function () {
  var inAppBrowserManager = InAppBrowserManager.getInstance();

  $(document).on("pageinit","#inAppBrowser", function (e) {
    e.preventDefault();

    $("#openGoogleSearchPage").on("tap", function (e) {
      e.preventDefault();

      var windowRef = inAppBrowserManager.openWindow("http://www.google.com");

      window.setTimeout(function () {
        inAppBrowserManager.closeWindow(windowRef);
      }, 10000);

    });
  });
})();