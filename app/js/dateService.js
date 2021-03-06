var dateService = (function() {
  "use strict";

  function getReformatedDate(date) {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2); //January is 0!
    const year = date.getFullYear();

    return year + "." + month + "." + day;
  };

  function getDefaultWellStartDate() {
    var defaultWellStartDate = new Date();
    defaultWellStartDate.setDate(defaultWellStartDate.getDate() - 21);

    return defaultWellStartDate;
  };

  return {
    getReformatedDate: getReformatedDate,
    getDefaultWellStartDate: getDefaultWellStartDate
  };

})();
