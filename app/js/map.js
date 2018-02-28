var map;

var app = angular.module('mapApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngRoute'])
.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }
]);

google.charts.load("current", {
  packages:['table', 'corechart'],
  callback: function() {
    angular.bootstrap(document, ['mapApp']);
  }
});
