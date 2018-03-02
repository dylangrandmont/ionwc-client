var hotKeyService = (function() {
  "use strict";

  var keyCallbacks = {},
      registerCallBackForHotKey,
      checkKey;

  document.onkeydown = function(event) {
    event = event || window.event;
    for (const [key, callBack] of Object.entries(keyCallbacks)) {
      if (String(event.key) === key) {
        callBack();
      }
    }
  };

  registerCallBackForHotKey = function(keyCode, callback) {
    keyCallbacks[keyCode] = callback;
  };

  return {
  	registerCallBackForHotKey: registerCallBackForHotKey
  };
})();
