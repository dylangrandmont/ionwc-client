var LayerManager = (function(dateService, TABLE_IDS) {

  "use strict";

  const drillingLayer = new google.maps.FusionTablesLayer({
    suppressInfoWindows: true,
    query: {
      select: 'address',
      from: TABLE_IDS.drilling,
      where:  "'DrillDate' >= '" + dateService.getDefaultWellStartDate() + "'"
    },
    styles: markerColors
  });

  const licencingLayer = new google.maps.FusionTablesLayer({
    suppressInfoWindows: true,
    query: {
      select: 'address',
      from: TABLE_IDS.licensing,
      where: "'Date' >= '" + dateService.getDefaultWellStartDate() + "'"
    },
    styles: markerColors
  });

  const upComingLandSaleLayer = new google.maps.FusionTablesLayer({
    suppressInfoWindows: true,
    query: {
      select: '\'Geocodable address\'',
      from: TABLE_IDS.upComingLandSale,
      where: "'saleDate' >= '" + dateService.getReformatedDate(new Date()) + "'"
    },
    options: {
      styleId: 2,
      templateId: 2
    }
  });

  const previousLandSaleLayer = new google.maps.FusionTablesLayer({
    suppressInfoWindows: true,
    query: {
      select: '\'Geocodable address\'',
      from: TABLE_IDS.previousLandSale
    }
  });

  const w5w6SectionLayer = new google.maps.FusionTablesLayer({
    query: {
      select: '\'Geocodable address\'',
      from: TABLE_IDS.w5w6TableID
    },
    suppressInfoWindows: true,
    options: {
      styleId: 2,
      templateId: 2
    }
  });

  const w4w5SectionLayer = new google.maps.FusionTablesLayer({
    query: {
      select: '\'Geocodable address\'',
      from: TABLE_IDS.w4w5TableID
    },
    suppressInfoWindows: true,
    options: {
      styleId: 2,
      templateId: 2
    }
  });

  const w3w4SectionLayer = new google.maps.FusionTablesLayer({
    query: {
      select: '\'Geocodable address\'',
      from: TABLE_IDS.w3w4TableID
    },
    suppressInfoWindows: true,
    options: {
      styleId: 2,
      templateId: 2
    }
  });

  const w2w3SectionLayer = new google.maps.FusionTablesLayer({
    query: {
      select: '\'Geocodable address\'',
      from: TABLE_IDS.w2w3TableID
    },
    suppressInfoWindows: true,
    options: {
      styleId: 2,
      templateId: 2
    }
  });

  const w1w2SectionLayer = new google.maps.FusionTablesLayer({
    query: {
      select: '\'Geocodable address\'',
      from: TABLE_IDS.w1w2TableID
    },
    suppressInfoWindows: true,
    options: {
      styleId: 2,
      templateId: 2
    }
  });

  const e1w1SectionLayer = new google.maps.FusionTablesLayer({
    query: {
      select: '\'Geocodable address\'',
      from: TABLE_IDS.e1w1TableID
    },
    suppressInfoWindows: true,
    options: {
      styleId: 2,
      templateId: 2
    }
  });

  const townshipLayer = new google.maps.FusionTablesLayer({
    query: {
      select: '\'Geocodable address\'',
      from: TABLE_IDS.townshipTableID
    },
    suppressInfoWindows: true,
    options: {
      styleId: 2,
      templateId: 2
    }
  });

  const nts50kLayer = new google.maps.KmlLayer('http://ionwc.com/data/kml/NTS_50k_polygon.kml', {
    suppressInfoWindows: true,
    preserveViewport: true
  });

  const nts250kLayer = new google.maps.KmlLayer('http://ionwc.com/data/kml/NTS_250k_polygon.kml', {
    suppressInfoWindows: true,
    preserveViewport: true
  });

  const ntsBlockLayer = new google.maps.FusionTablesLayer({
    query: {
      select: '\'Geocodable address\'',
      from: TABLE_IDS.ntsBlockTableID
    },
    suppressInfoWindows: true,
    options: {
      styleId: 2,
      templateId: 2
    }
  });

  const w112NTSLayer = new google.maps.FusionTablesLayer({
    query: {
      select: '\'Geocodable address\'',
      from: TABLE_IDS.w112NTSTableID
    },
    suppressInfoWindows: true,
    options: {
      styleId: 2,
      templateId: 2
    }
  });

  const w122NTSLayer = new google.maps.FusionTablesLayer({
    query: {
      select: '\'Geocodable address\'',
      from: TABLE_IDS.w122NTSTableID
    },
    suppressInfoWindows: true,
    options: {
      styleId: 2,
      templateId: 2
    }
  });

  return {
    drillingLayer: drillingLayer,
    licencingLayer: licencingLayer,
    upComingLandSaleLayer: upComingLandSaleLayer,
    previousLandSaleLayer: previousLandSaleLayer,
    w5w6SectionLayer: w5w6SectionLayer,
    w4w5SectionLayer: w4w5SectionLayer,
    w3w4SectionLayer: w3w4SectionLayer,
    w2w3SectionLayer: w2w3SectionLayer,
    w1w2SectionLayer: w1w2SectionLayer,
    e1w1SectionLayer: e1w1SectionLayer,
    townshipLayer: townshipLayer,
    nts50kLayer: nts50kLayer,
    nts250kLayer: nts250kLayer,
    ntsBlockLayer: ntsBlockLayer,
    w112NTSLayer: w112NTSLayer,
    w122NTSLayer: w122NTSLayer
  };
})(dateService, TABLE_IDS);
