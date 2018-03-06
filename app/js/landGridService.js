var landGridService = (function(google) {
  "use strict";

  var landGridInitialized = false;
  var landGridMap;

  var sectionLabels = [],
      townshipLabels = [],
      nts250kLabels = [],
      nts50kLabels = [],
      ntsBlockLabels = [],
      ntsUnitLabels = [];

  var w5w6LabelTableID = '18qUVQeJlqOZLiO6N8E44o4r_VXfqyk4HkehljNuY',
      w4w5LabelTableID = '1izV4_zLaS90KI2srS5VZPIZhw-MLWZ5ADve_4cOA',
      w3w4LabelTableID = '1Lf45NBxf8Tkyu2CnNWk06U4miV4NZ8RlKaO5W3sB',
      w2w3LabelTableID = '1d9zBaS1rZXFwSgdE05JIiq1i5XdzXi41FeSsubyR',
      w1w2LabelTableID = '1fKicnwFNeWAj-UgCcQt6BeO0HCdKCc26TN62gJ_Z',
      e1w1LabelTableID = '1PUPVXGCDpU3OpVOYRUQMpsZRhkF3oN6KbclRtuS8',
      ntsBlockLabelTableID = '1waGyZUHxHxFXd_BBaF5IzBm3hyLxk84trf_bpX4E',
      w112NTSLabelTableID = '1b9xfUP-btu5EvYaUjSFgOBjGxyBfNi1setmjSUmU',
      w122NTSLabelTableID = '14AHEqJvI--MRdLLTfAwh319gTTfq2fKNgTUYK-vI';

  var closestNTSUnitTableID;

  var landGridOn = false;

  const meridianLngs = [-97.45, -102.0, -106.0, -110.0, -114.0, -118.0];

  function initializeLandGrid() {
    landGridInitialized = true;
    LayerManager.w5w6SectionLayer.setMap(null);
    LayerManager.w4w5SectionLayer.setMap(null);
    LayerManager.w3w4SectionLayer.setMap(null);
    LayerManager.w2w3SectionLayer.setMap(null);
    LayerManager.w1w2SectionLayer.setMap(null);
    LayerManager.e1w1SectionLayer.setMap(null);
    LayerManager.townshipLayer.setMap(null);
    LayerManager.nts50kLayer.setMap(null);
    LayerManager.nts250kLayer.setMap(null);
    LayerManager.ntsBlockLayer.setMap(null);
    LayerManager.w112NTSLayer.setMap(null);
    LayerManager.w122NTSLayer.setMap(null);

    google.maps.event.addListener(landGridMap, "bounds_changed", onBoundsChanged);
    google.maps.event.addListener(landGridMap, "zoom_changed", onZoomChanged);
  }

  function onBoundsChanged() {
    const zoom = landGridMap.getZoom();

    if (landGridOn) {
      clearLabels(nts250kLabels);
      clearLabels(nts50kLabels);
      update250kLabels();

      if (zoom >= 8) {
        clearLabels(ntsBlockLabels);
        update50kLabels();

        if (zoom >= 9) {
          clearLabels(townshipLabels);
          clearLabels(sectionLabels);
          updateTownships();
          updateNTSBlockLabels();

          if (zoom >= 11){
            clearLabels(ntsUnitLabels);
            enableNTSUnitsInView();

            if (zoom >= 12) {
              updateSections();
              updateNTSUnitLabels();
            }
          }
        }
      }
    }
  }

  function onZoomChanged() {
    var zoom = landGridMap.getZoom();

    if (landGridOn) {
      LayerManager.townshipLayer.setMap(null);
      clearLabels(nts250kLabels);
      LayerManager.nts50kLayer.setMap(null);
      LayerManager.townshipLayer.setMap(landGridMap);
      LayerManager.nts250kLayer.setMap(landGridMap);
      redrawLayers();

      if (zoom >= 7) {
        LayerManager.ntsBlockLayer.setMap(null);
        LayerManager.nts50kLayer.setMap(landGridMap);
        redrawLayers();
        clearLabels(nts50kLabels);
        if (zoom >= 8) {
          LayerManager.ntsBlockLayer.setMap(landGridMap);
          redrawLayers();
          clearLabels(nts50kLabels);
          clearLabels(townshipLabels);
          if (zoom >= 10) {
            LayerManager.w112NTSLayer.setMap(null);
            LayerManager.w122NTSLayer.setMap(null);
            if (zoom >= 11) {
              clearSectionLayers();
              if (zoom < 12) {
                clearLabels(sectionLabels);
                clearLabels(ntsUnitLabels);
              }
            }
          }
        }
      }
    } else {
      LayerManager.townshipLayer.setMap(null);
      LayerManager.nts250kLayer.setMap(null);
      LayerManager.nts50kLayer.setMap(null);
      LayerManager.ntsBlockLayer.setMap(null);
      LayerManager.w112NTSLayer.setMap(null);
      LayerManager.w122NTSLayer.setMap(null);
      clearSectionLayers();
      clearLabels(sectionLabels);
      clearLabels(townshipLabels);
      clearLabels(nts250kLabels);
      clearLabels(nts50kLabels);
      clearLabels(ntsBlockLabels);
      clearLabels(ntsUnitLabels);
    }
  }

  function redrawLayers() {
    LayerManager.licencingLayer.setMap(LayerManager.licencingLayer.getMap());
    LayerManager.drillingLayer.setMap(LayerManager.drillingLayer.getMap());
    LayerManager.upComingLandSaleLayer.setMap(LayerManager.upComingLandSaleLayer.getMap());
    LayerManager.previousLandSaleLayer.setMap(LayerManager.previousLandSaleLayer.getMap());
  }

  function clearSectionLayers() {
    LayerManager.w5w6SectionLayer.setMap(null);
    LayerManager.w4w5SectionLayer.setMap(null);
    LayerManager.w3w4SectionLayer.setMap(null);
    LayerManager.w2w3SectionLayer.setMap(null);
    LayerManager.w1w2SectionLayer.setMap(null);
    LayerManager.e1w1SectionLayer.setMap(null);
  }

  function clearLabels(labels) {
    labels.forEach(function(label) {
      label.setMap(null);
    });

    labels = [];
  }

  function updateSections() {
    var closestSectionTableID = getNearestSectionTableID(landGridMap.getCenter().lng());
    var closestSectionLabelTableID = getLabelTableID(closestSectionTableID);
    enableClosestSectionMap(closestSectionTableID);

    if (landGridMap.getBounds()) {
      var queryStr = "SELECT 'geometry', 'SC' FROM "+ closestSectionLabelTableID + " WHERE ST_INTERSECTS(geometry, RECTANGLE(LATLNG" + landGridMap.getBounds().getSouthWest() + ",LATLNG" + landGridMap.getBounds().getNorthEast() + "))";   
      var queryText = encodeURIComponent(queryStr);
      var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText);

      query.send(updateSectionsText);
    }
  }

  function getNearestSectionTableID(lng) {
    var closestMeridian,
    minDistance = 100.0;
    for (var i = 0; i < meridianLngs.length; i++) {
      if (Math.abs(lng - meridianLngs[i]) < minDistance) {
        minDistance = Math.abs(lng - meridianLngs[i]);
        closestMeridian = i+1;
      }
    }
    switch(closestMeridian) {
      case 1:
        return TABLE_IDS.e1w1TableID;
      case 2:
        return TABLE_IDS.w1w2TableID;
      case 3:
        return TABLE_IDS.w2w3TableID;
      case 4:
        return TABLE_IDS.w3w4TableID;
      case 5:
        return TABLE_IDS.w4w5TableID;
      default:
        return TABLE_IDS.w5w6TableID;
    }
  }

  function getLabelTableID(tableid) {
    switch(tableid) {
      case TABLE_IDS.w5w6TableID:
        return w5w6LabelTableID;
      case TABLE_IDS.w4w5TableID:
        return w4w5LabelTableID;
      case TABLE_IDS.w3w4TableID:
        return w3w4LabelTableID;
      case TABLE_IDS.w2w3TableID:
        return w2w3LabelTableID;
      case TABLE_IDS.w1w2TableID:
        return w1w2LabelTableID;
      case TABLE_IDS.e1w1TableID:
        return e1w1LabelTableID;
    }
  }

  function updateSectionsText(response) {
    var responseTable = response.getDataTable();

    if (responseTable !== null) {
      const numRows = responseTable.getNumberOfRows();

      for (var i = 0; i < numRows; i++) {
        const coordinates = getCoordinatesFromRow(response, i);
        var point = new google.maps.LatLng(
          parseFloat(coordinates.lat),
          parseFloat(coordinates.lng)
        );

        sectionLabels.push(new InfoBox({
          content: coordinates.sectionString,
          boxStyle: {
            border: "0px solid black",
            textAlign: "center",
            fontSize: "9pt",
            width: "50px"
          },
          disableAutoPan: true,
          pixelOffset: new google.maps.Size(-25, 0),
          position: point,
          closeBoxURL: "",
          isHidden: false,
          enableEventPropagation: true
        }));

        sectionLabels[sectionLabels.length-1].open(landGridMap);
      }
    }
  }

  function enableClosestSectionMap(tableID) {
    if (landGridMap.getZoom() > 12) {
      switch(tableID) {
        case TABLE_IDS.w5w6TableID:
          clearSectionLayers();
          LayerManager.w5w6SectionLayer.setMap(landGridMap);
          break;
        case TABLE_IDS.w4w5TableID:
          clearSectionLayers();
          LayerManager.w4w5SectionLayer.setMap(landGridMap);
          break;
        case TABLE_IDS.w3w4TableID:
          clearSectionLayers();
          LayerManager.w3w4SectionLayer.setMap(landGridMap);
          break;
        case TABLE_IDS.w2w3TableID:
          clearSectionLayers();
          LayerManager.w2w3SectionLayer.setMap(landGridMap);
          break;
        case TABLE_IDS.w1w2TableID:
          clearSectionLayers();
          LayerManager.w1w2SectionLayer.setMap(landGridMap);
          break;
        case TABLE_IDS.e1w1TableID:
          clearSectionLayers();
          LayerManager.e1w1SectionLayer.setMap(landGridMap);
          break;
      }

      redrawLayers();
    }
  }

  function enableNTSUnitsInView() {
    if (landGridMap.getCenter().lng() > -122.0 &&
      landGridMap.getCenter().lng() < -120.0) {
      LayerManager.w112NTSLayer.setMap(landGridMap);
      LayerManager.w122NTSLayer.setMap(null);
      closestNTSUnitTableID = w112NTSLabelTableID;
    } else if (landGridMap.getCenter().lng() > -124.0 &&
      landGridMap.getCenter().lng() < -122.0) {
      LayerManager.w112NTSLayer.setMap(null);
      LayerManager.w122NTSLayer.setMap(landGridMap);
      closestNTSUnitTableID = w122NTSLabelTableID;
    } else {
      LayerManager.w112NTSLayer.setMap(null);
      LayerManager.w122NTSLayer.setMap(null);
    }
  }

  function updateTownships() {
    if (landGridMap.getBounds()) {
      var queryStr = "SELECT 'geometry', 'DLS_ID' FROM 1BDEHLkR0cR_UEOB0IvIfTu5pP5GDYI0CCQ1ioweU WHERE ST_INTERSECTS(geometry, RECTANGLE(LATLNG"+landGridMap.getBounds().getSouthWest()+",LATLNG"+landGridMap.getBounds().getNorthEast()+"))";   
      var queryText = encodeURIComponent(queryStr);
      var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText);
      query.send(updateTownshipsText);
    }
  }

  function updateTownshipsText(response) {
    var responseTable = response.getDataTable();

    if (responseTable !== null) {
      const numRows = responseTable.getNumberOfRows();
      var labelSize = "12pt",
          labelWidth = "75px",
          labelOffset = -37;

      if (landGridMap.getZoom() === 10) {
        labelSize = "9pt";
        labelWidth = "56px";
        labelOffset = -28;
      } else if (landGridMap.getZoom() === 9) {
        labelSize = "8pt";
        labelWidth = "50px";
        labelOffset = -25;
      }

      for (var i = 0; i < numRows; i++) {
        const coordinates = getCoordinatesFromRow(response, i);
        var point = new google.maps.LatLng(
          parseFloat(coordinates.lat),
          parseFloat(coordinates.lng)
        );

        townshipLabels.push(new InfoBox({
          content: coordinates.sectionString,
          boxStyle: {
            border: "0px solid black",
            textAlign: "center",
            fontSize: labelSize,
            width: labelWidth
          },
          disableAutoPan: true,
          pixelOffset: new google.maps.Size(labelOffset, -5),
          position: point,
          closeBoxURL: "",
          isHidden: false,
          enableEventPropagation: true
        }));

        townshipLabels[townshipLabels.length-1].open(landGridMap);
      }
    }
  }


  function update250kLabels() {
    if (landGridMap.getBounds()) {
      var queryStr = "SELECT 'geometry', 'NTS_ID' FROM 1w4ZpQgXgzKsX2OswFGn70XpyltsYJnVaP1i7zQ9I WHERE ST_INTERSECTS(geometry, RECTANGLE(LATLNG" + landGridMap.getBounds().getSouthWest()+",LATLNG"+landGridMap.getBounds().getNorthEast()+"))";   
      var queryText = encodeURIComponent(queryStr);
      var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText);
      query.send(update250kLabelsText);
    }
  }

  function update250kLabelsText(response) {
    var responseTable = response.getDataTable();

    if (responseTable !== null) {
      const numRows = responseTable.getNumberOfRows();


      for (var i = 0; i < numRows; i++) {
        const coordinates = getCoordinatesFromRow(response, i);
        var point = new google.maps.LatLng(
          parseFloat(coordinates.lat),
          parseFloat(coordinates.lng)
        );

        nts250kLabels.push(new InfoBox({
          content: coordinates.sectionString,
          boxStyle: {
            border: "0px solid black",
            textAlign: "center",
            color: "black",
            fontSize: "12pt",
            width: "75px"
          },
          disableAutoPan: true,
          pixelOffset: new google.maps.Size(-37, -11),
          position: point,
          closeBoxURL: "",
          isHidden: false,
          enableEventPropagation: true
        }));
        nts250kLabels[nts250kLabels.length-1].open(landGridMap);
      }
    }
  }

  function update50kLabels() {
    if (landGridMap.getBounds()) {
      var queryStr = "SELECT 'geometry', 'NTS_50K' FROM 1Izlxp4e1TBVSKCI-volXITIKVv0W2KZEV-OfWM3j WHERE ST_INTERSECTS(geometry, RECTANGLE(LATLNG"+landGridMap.getBounds().getSouthWest()+",LATLNG"+landGridMap.getBounds().getNorthEast()+"))";   
      var queryText = encodeURIComponent(queryStr);
      var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText);
      query.send(update50kLabelsText);
    }
  }

  function update50kLabelsText(response) {
    var responseTable = response.getDataTable();

    if (responseTable !== null) {
      const numRows = responseTable.getNumberOfRows();

      for (var i = 0; i < numRows; i++) {
        const coordinates = getCoordinatesFromRow(response, i);
        var point = new google.maps.LatLng(
          parseFloat(coordinates.lat),
          parseFloat(coordinates.lng)
        );

        nts50kLabels.push(new InfoBox({
          content: coordinates.sectionString,
          boxStyle: {
            border: "0px solid black",
            textAlign: "center",
            fontSize: "11pt",
            width: "40px"
          },
          disableAutoPan: true,
          pixelOffset: new google.maps.Size(-20, -5),
          position: point,
          closeBoxURL: "",
          isHidden: false,
          enableEventPropagation: true
        }));
        nts50kLabels[nts50kLabels.length-1].open(landGridMap);
      }
    }
  }

  function updateNTSBlockLabels() {
    if (landGridMap.getBounds()) {
      var queryStr = "SELECT 'geometry', 'BC_BLOCK' FROM " + ntsBlockLabelTableID + " WHERE ST_INTERSECTS(geometry, RECTANGLE(LATLNG"+landGridMap.getBounds().getSouthWest()+",LATLNG"+landGridMap.getBounds().getNorthEast()+"))";   
      var queryText = encodeURIComponent(queryStr);
      var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText);
      query.send(updateNTSBlockLabelsText);
    }
  }

  function updateNTSBlockLabelsText(response) {
    var responseTable = response.getDataTable();

    if (responseTable !== null) {
      const numRows = responseTable.getNumberOfRows();

      for (var i = 0; i < numRows; i++) {
        const coordinates = getCoordinatesFromRow(response, i);
        var point = new google.maps.LatLng(
          parseFloat(coordinates.lat),
          parseFloat(coordinates.lng)
        );

        ntsBlockLabels.push(new InfoBox({
          content: coordinates.sectionString,
          boxStyle: {
            border: "0px solid black",
            textAlign: "center",
            fontSize: "9pt",
            width: "40px"
          },
          disableAutoPan: true,
          pixelOffset: new google.maps.Size(-20, -5),
          position: point,
          closeBoxURL: "",
          isHidden: false,
          enableEventPropagation: true
        }));
        ntsBlockLabels[ntsBlockLabels.length-1].open(landGridMap);
      }
    }
  }

  function updateNTSUnitLabels() {
    if (landGridMap.getBounds()) {
      var queryStr = "SELECT 'geometry', 'BC_UNIT' FROM " + closestNTSUnitTableID + " WHERE ST_INTERSECTS(geometry, RECTANGLE(LATLNG"+landGridMap.getBounds().getSouthWest()+",LATLNG"+landGridMap.getBounds().getNorthEast()+"))";   
      var queryText = encodeURIComponent(queryStr);
      var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + queryText);
      query.send(updateNTSUnitLabelsText);
    }
  }

  function updateNTSUnitLabelsText(response) {
    var responseTable = response.getDataTable();

    if (responseTable !== null) {
      const numRows = responseTable.getNumberOfRows();

      for (var i = 0; i < numRows; i++) {
        const coordinates = getCoordinatesFromRow(response, i);
        var point = new google.maps.LatLng(
          parseFloat(coordinates.lat),
          parseFloat(coordinates.lng)
        );

        ntsUnitLabels.push(new InfoBox({
          content: coordinates.sectionString,
          boxStyle: {
            border: "0px solid black",
            textAlign: "center",
            fontSize: "8pt",
            width: "40px"
          },
          disableAutoPan: true,
          pixelOffset: new google.maps.Size(-20, -5),
          position: point,
          closeBoxURL: "",
          isHidden: false,
          enableEventPropagation: true
        }));
        ntsUnitLabels[ntsUnitLabels.length-1].open(landGridMap);
      }
    }
  }

  function getCoordinatesFromRow(response, rowIndex) {
    const latlng = response.getDataTable().getValue(rowIndex, 0).toString().replace('<Point><coordinates>', '').replace('</coordinates></Point>', '');
    const lng = latlng.split(',')[0];
    const lat = latlng.split(',')[1];

    const sectionString = response.getDataTable().getValue(rowIndex, 1).toString();

    return {
      'lng': lng,
      'lat': lat,
      'sectionString': sectionString
    };
  }

  function setMap(map) {
    landGridMap = map;
  }

  function toggleLandGrid(toggleOn) {
    if (toggleOn) {
      if (!landGridInitialized) {
        initializeLandGrid();
      }

      if (landGridMap.getZoom() < 6) {
        landGridMap.setZoom(6);
      }

      landGridOn = true;
      onZoomChanged();
      onBoundsChanged();
    } else {
      landGridOn = false;
      onZoomChanged();
      onBoundsChanged();
    }
  }

  return {
    setMap: setMap,
    toggleLandGrid: toggleLandGrid
  };

})(google);
