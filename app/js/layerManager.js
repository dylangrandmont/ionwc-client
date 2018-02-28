var LayerManager = {
  'drillingLayer': new google.maps.FusionTablesLayer({
      suppressInfoWindows: true,
      query: {
        select: 'address',
        from: tableIDs.drilling,
        where:  "'DrillDate' >= '" + dateService.getDefaultWellStartDate() + "'"
      },
      styles: markerColors
    }),

  'licencingLayer': new google.maps.FusionTablesLayer({
      suppressInfoWindows: true,
      query: {
        select: 'address',
        from: tableIDs.licensing,
        where: "'Date' >= '" + dateService.getDefaultWellStartDate() + "'"
      },
      styles: markerColors
    }),

  'upComingLandSaleLayer': new google.maps.FusionTablesLayer({
      suppressInfoWindows: true,
      query: {
        select: '\'Geocodable address\'',
        from: tableIDs.upComingLandSale,
        where: "'saleDate' >= '" + dateService.getReformatedDate(new Date()) + "'"
      },
      options: {
        styleId: 2,
        templateId: 2
      }
    }),

  'previousLandSaleLayer': new google.maps.FusionTablesLayer({
      suppressInfoWindows: true,
      query: {
        select: '\'Geocodable address\'',
        from: tableIDs.previousLandSale
      }
    })
};
