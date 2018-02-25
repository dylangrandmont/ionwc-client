describe("LandGrid", function() {

  it("should get correct coordinates from response", function() {
    var mockResponse = {
      getDataTable: function getDataTable() {
        return {
          getValue: function getValue(index, columnIndex) {
            if (columnIndex === 0) {
              return '<Point><coordinates>100.00,50.00</coordinates></Point>';
            } else if (columnIndex === 1) {
              return 'K'
            } else {
              return '';
            }
          }
        }
      }
    }

    const coordinates = getCoordinatesFromRow(mockResponse);

    expect(coordinates.lng).toEqual('100.00');
    expect(coordinates.lat).toEqual('50.00');
    expect(coordinates.sectionString).toEqual('K');
  });

});
