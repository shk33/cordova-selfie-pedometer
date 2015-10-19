var ContactsManager = (function () {
  var instance;

  function createObject () {
    return {
      getAllContacts: function (callback, filterText) {
        var options = new ContactFindOptions();
        options.filter = filterText || "";
        options.multiple = true;
        var fields = ["id","name","phoneNumbers"];
        navigator.contacts.find(fields, callback.onSuccess, callback.onError, options);
      }
    };
  }

  return {
    getInstance: function (argument) {
      if(!instance){
        instance = createObject();
      }
      return instance;
    }
  };
})();