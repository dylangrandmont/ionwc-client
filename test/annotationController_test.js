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

  it('should update maps if checkboxes are updated', function() {

  });
});