'use strict';

/* Controllers

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });

  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });

 */
 angular.module('businessOrganizer.controllers', []).
  controller('jobController', function($http){
    this.jobs = [];
    $http({
      method: 'GET',
      url: '/jobs'
    }).success(function (data, status, headers, config) {
      $scope.jobs = data;
    }).
      error(function(data, status, headers, config){
        $scope.jobs = ['Eroor'];
      });
  });

