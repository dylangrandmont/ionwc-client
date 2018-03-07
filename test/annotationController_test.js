describe('annotationController', function() {
  beforeEach(module('mapApp'));

  var $controller,
      $rootScope;

  beforeEach(inject(function(_$controller_, _$rootScope_){
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));

  it('has geoEdgesCheckboxes unchchecked by default', function() {
    var $scope = $rootScope.$new();
    var controller = $controller('annotationController', {
      $scope: $scope
    });

    expect($scope.geoEdgesCheckboxes.length).toEqual(15);

    $scope.geoEdgesCheckboxes.forEach(function(checkbox) {
      expect(checkbox.val).toEqual(false);
    });
  });

  it('has licensingTrendsCheckboxes unchchecked by default', function() {
    var $scope = $rootScope.$new();
    var controller = $controller('annotationController', {
      $scope: $scope
    });

    expect($scope.licensingTrendsCheckboxes.length).toEqual(8);

    $scope.licensingTrendsCheckboxes.forEach(function(checkbox) {
      expect(checkbox.val).toEqual(false);
    });
  });

  it('should update geologicalEdges\'s maps if checkboxes are updated', function() {
    var $scope = $rootScope.$new();
    var controller = $controller('annotationController', {
      $scope: $scope
    });
    element = document.createElement('div');
    element.id = "map";
    document.body.appendChild(element);

    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 50.0,
        lng: -102.0
      }
    });

    $scope.geoEdgesCheckboxes[0].val = true;
    $scope.$digest();

    let isFirstEdge = true;

    $scope.geologicalEdges.forEach(function(geologicalEdge) {
      if (isFirstEdge) {
        expect(geologicalEdge.getMap()).toEqual(map);  
        isFirstEdge = false;
      } else {
        expect(geologicalEdge.getMap()).toEqual(null);
      }
    });

    $scope.licensingTrends.forEach(function(licensingTrend) {
      expect(licensingTrend.getMap()).toEqual(null);
    });
  });

  it('should update licensingTrends\'s maps if checkboxes are updated', function() {
    var $scope = $rootScope.$new();
    var controller = $controller('annotationController', {
      $scope: $scope
    });
    element = document.createElement('div');
    element.id = "map";
    document.body.appendChild(element);

    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 50.0,
        lng: -102.0
      }
    });

    $scope.licensingTrendsCheckboxes[0].val = true;
    $scope.$digest();

    let isFirstEdge = true;

    $scope.licensingTrends.forEach(function(licensingTrend) {
      if (isFirstEdge) {
        expect(licensingTrend.getMap()).toEqual(map);  
        isFirstEdge = false;
      } else {
        expect(licensingTrend.getMap()).toEqual(null);
      }
    });

    $scope.geologicalEdges.forEach(function(geologicalEdge) {
      expect(geologicalEdge.getMap()).toEqual(null);
    });
  });
});