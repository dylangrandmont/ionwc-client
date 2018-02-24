describe("DateService", function() {

  it("should reformat dates", function() {
    var date = new Date();
    date.setFullYear(2020, 0, 14);
    var reformatedDate = DateService.getReformatedDate(date);
    expect(reformatedDate).toEqual("2020.01.14");
  });

  it("should get three weeks ago as default well start date", function() {
    var threeWeeksAgo = new Date();
    threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);
    
    var defaultWellStartDate = DateService.getDefaultWellStartDate();
    expect(DateService.getReformatedDate(defaultWellStartDate)).toEqual(DateService.getReformatedDate(threeWeeksAgo));
  })

});
