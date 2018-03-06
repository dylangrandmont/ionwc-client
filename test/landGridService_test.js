describe("landGridService", function() {

  let element,
      map;

  beforeEach(function() {
    element = document.createElement('div');
    element.id = "map";
    document.body.appendChild(element);

    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 50.0,
        lng: -102.0
      }
    });
  });

  it("should zoom in map if toggled on", function() {
    const zooms = [1, 2, 3, 4, 5, 6];

    zooms.forEach(function(zoom) {
      map.setZoom(zoom);
      landGridService.setMap(map);
      landGridService.toggleLandGrid(true);

      expect(map.getZoom()).toEqual(6);
    })
  });

  it("should display NTS 50K layer if zoomed to 7", function() {
    map.setZoom(7);
    landGridService.setMap(map);
    landGridService.toggleLandGrid(true);

    expect(map.getZoom()).toEqual(7);
    expect(LayerManager.w5w6SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w4w5SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w3w4SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w2w3SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w1w2SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.e1w1SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.townshipLayer.getMap()).toEqual(map);
    expect(LayerManager.nts50kLayer.getMap()).toEqual(map);
    expect(LayerManager.nts250kLayer.getMap()).toEqual(map);
    expect(LayerManager.ntsBlockLayer.getMap()).toEqual(null);
    expect(LayerManager.w112NTSLayer.getMap()).toEqual(null);
    expect(LayerManager.w122NTSLayer.getMap()).toEqual(null);
  });

  it("should display NTS Block layer if zoomed to 8", function() {
    map.setZoom(8);
    landGridService.setMap(map);
    landGridService.toggleLandGrid(true);

    expect(map.getZoom()).toEqual(8);
    expect(LayerManager.w5w6SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w4w5SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w3w4SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w2w3SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w1w2SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.e1w1SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.townshipLayer.getMap()).toEqual(map);
    expect(LayerManager.nts50kLayer.getMap()).toEqual(map);
    expect(LayerManager.nts250kLayer.getMap()).toEqual(map);
    expect(LayerManager.ntsBlockLayer.getMap()).toEqual(map);
    expect(LayerManager.w112NTSLayer.getMap()).toEqual(null);
    expect(LayerManager.w122NTSLayer.getMap()).toEqual(null);
  });

  it("should display e1w1SectionLayer if zoomed to 13 near first meridian", function() {
    map.setZoom(13);
    map.setCenter({
      lat: 50.0,
      lng: -97.45
    });
    landGridService.setMap(map);
    landGridService.toggleLandGrid(true);

    expect(map.getZoom()).toEqual(13);
    expect(LayerManager.w5w6SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w4w5SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w3w4SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w2w3SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w1w2SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.e1w1SectionLayer.getMap()).toEqual(map);
    expect(LayerManager.townshipLayer.getMap()).toEqual(map);
    expect(LayerManager.nts50kLayer.getMap()).toEqual(map);
    expect(LayerManager.nts250kLayer.getMap()).toEqual(map);
    expect(LayerManager.ntsBlockLayer.getMap()).toEqual(map);
    expect(LayerManager.w112NTSLayer.getMap()).toEqual(null);
    expect(LayerManager.w122NTSLayer.getMap()).toEqual(null);
  });

  it("should display w1w2SectionLayer if zoomed to 13 near second meridian", function() {
    map.setZoom(13);
    map.setCenter({
      lat: 50.0,
      lng: -102.0
    });
    landGridService.setMap(map);
    landGridService.toggleLandGrid(true);

    expect(map.getZoom()).toEqual(13);
    expect(LayerManager.w5w6SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w4w5SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w3w4SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w2w3SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w1w2SectionLayer.getMap()).toEqual(map);
    expect(LayerManager.e1w1SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.townshipLayer.getMap()).toEqual(map);
    expect(LayerManager.nts50kLayer.getMap()).toEqual(map);
    expect(LayerManager.nts250kLayer.getMap()).toEqual(map);
    expect(LayerManager.ntsBlockLayer.getMap()).toEqual(map);
    expect(LayerManager.w112NTSLayer.getMap()).toEqual(null);
    expect(LayerManager.w122NTSLayer.getMap()).toEqual(null);
  });

  it("should display w2w3SectionLayer if zoomed to 13 near third meridian", function() {
    map.setZoom(13);
    map.setCenter({
      lat: 50.0,
      lng: -106.0
    });
    landGridService.setMap(map);
    landGridService.toggleLandGrid(true);

    expect(map.getZoom()).toEqual(13);
    expect(LayerManager.w5w6SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w4w5SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w3w4SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w2w3SectionLayer.getMap()).toEqual(map);
    expect(LayerManager.w1w2SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.e1w1SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.townshipLayer.getMap()).toEqual(map);
    expect(LayerManager.nts50kLayer.getMap()).toEqual(map);
    expect(LayerManager.nts250kLayer.getMap()).toEqual(map);
    expect(LayerManager.ntsBlockLayer.getMap()).toEqual(map);
    expect(LayerManager.w112NTSLayer.getMap()).toEqual(null);
    expect(LayerManager.w122NTSLayer.getMap()).toEqual(null);
  });

  it("should display w3w4SectionLayer if zoomed to 13 near fourth meridian", function() {
    map.setZoom(13);
    map.setCenter({
      lat: 50.0,
      lng: -110.0
    });
    landGridService.setMap(map);
    landGridService.toggleLandGrid(true);

    expect(map.getZoom()).toEqual(13);
    expect(LayerManager.w5w6SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w4w5SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w3w4SectionLayer.getMap()).toEqual(map);
    expect(LayerManager.w2w3SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w1w2SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.e1w1SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.townshipLayer.getMap()).toEqual(map);
    expect(LayerManager.nts50kLayer.getMap()).toEqual(map);
    expect(LayerManager.nts250kLayer.getMap()).toEqual(map);
    expect(LayerManager.ntsBlockLayer.getMap()).toEqual(map);
    expect(LayerManager.w112NTSLayer.getMap()).toEqual(null);
    expect(LayerManager.w122NTSLayer.getMap()).toEqual(null);
  });

  it("should display w4w5SectionLayer if zoomed to 13 near fifth meridian", function() {
    map.setZoom(13);
    map.setCenter({
      lat: 50.0,
      lng: -114.0
    });
    landGridService.setMap(map);
    landGridService.toggleLandGrid(true);

    expect(map.getZoom()).toEqual(13);
    expect(LayerManager.w5w6SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w4w5SectionLayer.getMap()).toEqual(map);
    expect(LayerManager.w3w4SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w2w3SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w1w2SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.e1w1SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.townshipLayer.getMap()).toEqual(map);
    expect(LayerManager.nts50kLayer.getMap()).toEqual(map);
    expect(LayerManager.nts250kLayer.getMap()).toEqual(map);
    expect(LayerManager.ntsBlockLayer.getMap()).toEqual(map);
    expect(LayerManager.w112NTSLayer.getMap()).toEqual(null);
    expect(LayerManager.w122NTSLayer.getMap()).toEqual(null);
  });


  it("should display w5w6SectionLayer if zoomed to 13 near sixth meridian", function() {
    map.setZoom(13);
    map.setCenter({
      lat: 50.0,
      lng: -118.0
    });
    landGridService.setMap(map);
    landGridService.toggleLandGrid(true);

    expect(map.getZoom()).toEqual(13);
    expect(LayerManager.w5w6SectionLayer.getMap()).toEqual(map);
    expect(LayerManager.w4w5SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w3w4SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w2w3SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w1w2SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.e1w1SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.townshipLayer.getMap()).toEqual(map);
    expect(LayerManager.nts50kLayer.getMap()).toEqual(map);
    expect(LayerManager.nts250kLayer.getMap()).toEqual(map);
    expect(LayerManager.ntsBlockLayer.getMap()).toEqual(map);
    expect(LayerManager.w112NTSLayer.getMap()).toEqual(null);
    expect(LayerManager.w122NTSLayer.getMap()).toEqual(null);
  });

  it("should not display any layers if toggled off", function() {
    landGridService.setMap(map);
    landGridService.toggleLandGrid(false);

    expect(LayerManager.w5w6SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w4w5SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w3w4SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w2w3SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w1w2SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.e1w1SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.townshipLayer.getMap()).toEqual(null);
    expect(LayerManager.nts50kLayer.getMap()).toEqual(null);
    expect(LayerManager.nts250kLayer.getMap()).toEqual(null);
    expect(LayerManager.ntsBlockLayer.getMap()).toEqual(null);
    expect(LayerManager.w112NTSLayer.getMap()).toEqual(null);
    expect(LayerManager.w122NTSLayer.getMap()).toEqual(null);
  });

});
