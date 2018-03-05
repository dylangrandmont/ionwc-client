describe("landGridService", function() {

  it("should bring map to zoom 6 if toggled on map", function() {
    var element = document.createElement('div');
    element.id = "map";
    document.body.appendChild(element);

    var map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: -34.397,
        lng: 150.644
      },
      zoom: 1
    });

    landGridService.setMap(map);
    landGridService.toggleLandGrid(true);

    expect(map.getZoom()).toEqual(6);
  });

});
