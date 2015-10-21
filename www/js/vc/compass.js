(function() {
    var compassManager = CompassManager.getInstance();
    var watchID;
    
    $(document).on("pageinit", "#compass", function(e) {
        e.preventDefault();
        
        $("#startWatchHeading").on("tap", function(e) {
            e.preventDefault();
            
            enableStartWatchHeadingButton(false); 
            
            var callback = {};
            
            callback.onSuccess = onSuccess;
            callback.onError = onError;
            
            watchID = compassManager.startWatchHeading(callback);          
        });       
        
        $("#stopWatchHeading").on("tap", function(e) {
            e.preventDefault();

            enableStartWatchHeadingButton(true);
            
            compassManager.stopWatchHeading(watchID);         
        });
           
        initPage();
    });

    $(document).on("pageinit", "#features", function(e) {
        e.preventDefault();
        var callback = {};
        callback.onSuccess = onSuccess;
        callback.onError = onError;
        watchID = compassManager.startWatchHeading(callback);          
    });
    
    $(document).on("pagebeforehide", "#compass", function(e) {
        
        //Make sure to stop heading watch before leaving the view. 
        compassManager.stopWatchHeading(watchID);
        enableStartWatchHeadingButton(true);
    });    
    
    function initPage() {
        $("#stopWatchHeading").closest('.ui-btn').hide();     
    }
    
    function onSuccess(heading) {
        console.log(degrees);
        $("#compassHeading").html("Heading: " + heading.magneticHeading);    
        degrees = heading.magneticHeading;
    }
    
    function onError(error) {
      $("#compassHeading").html("An error occurs during watch heading: " + error.code);
    }  
    
    function enableStartWatchHeadingButton(enable) {
        
        if (enable) {
            $("#startWatchHeading").button("enable");
            $("#stopWatchHeading").closest('.ui-btn').hide(); 
        } else {
            $("#startWatchHeading").button("disable");
            $("#stopWatchHeading").closest('.ui-btn').show(); 
        }
        
        $("#startWatchHeading").button("refresh");
    }
    
})();