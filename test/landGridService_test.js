describe("landGridService", function() {

  let element,
      map;

  beforeEach(function() {
    element = document.createElement('div');
    element.id = "map";
    document.body.appendChild(element);

    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: -34.397,
        lng: 150.644
      }
    });
  });

  it("should zoom in map if toggled on", function() {
    map.setZoom(1);
    landGridService.setMap(map);
    landGridService.toggleLandGrid(true);

    expect(map.getZoom()).toEqual(6);
    expect(LayerManager.w5w6SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w4w5SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w3w4SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w2w3SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.w1w2SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.e1w1SectionLayer.getMap()).toEqual(null);
    expect(LayerManager.townshipLayer.getMap()).toEqual(map);
    expect(LayerManager.nts50kLayer.getMap()).toEqual(null);
    expect(LayerManager.nts250kLayer.getMap()).toEqual(map);
    expect(LayerManager.ntsBlockLayer.getMap()).toEqual(null);
    expect(LayerManager.w112NTSLayer.getMap()).toEqual(null);
    expect(LayerManager.w122NTSLayer.getMap()).toEqual(null);
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
