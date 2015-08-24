'use strict';

jQuery = window.$;

var app = angular.module('bOrganizer', ['ui.bootstrap']);

app.factory('jobFactory', ['$http', function($http){

    var urlBase = '/jobs/';
    var jobFactory = {};

    jobFactory.getJobs = function(){
      return $http.get(urlBase + 'all');
    };
    jobFactory.deleteJob = function(id){
      return $http.delete(urlBase + id + '/destroy');
    };
    jobFactory.createJob = function(job){
      return $http.post(urlBase + 'create', job);
    };

    return jobFactory;
  }]);

app.controller('jobsController', ['$scope', 'jobFactory', function($scope, jobFactory){
      $scope.jobs = [];
      $scope.status = "Waiting";
      getJobs();
      function getJobs(){
        jobFactory.getJobs()
        .success(function(data){
          $scope.jobs = data;
        })
        .error(function(error){
          $scope.stats = error.message;
        })
      }
/*
      $http({
      method: 'GET',
      url: '/jobs/all'
    }).success(function (data, status, headers, config) {
      console.log("data" + data);
      $scope.jobs = dsata;
    }).
      error(function(data, status, headers, config){
        $scope.jobs = [{title:'Error'}];
      });
*/
    $scope.destroy = function(id){
      //console.log("aaaaajunns" + id);

      jobFactory.deleteJob(id).success(function(){
        $scope.status = 'User deleted'; 
        for (var i=0; i<$scope.jobs.length; i++)
        //$scope.jobs.forEach(function(d){
          //console.log(typeof d.id + d.id);
          //console.log(typeof id + id);
          if ($scope.jobs[i].id == id){
            //console.log($scope.jobs + 'xxx');
            $scope.jobs.splice(i, 1);
            //console.log($scope.jobs);
          }
        
      })
      .error(function(error){
        $scope.status = 'Error' + error.message;
      });
    };
  }]);

app.controller('formController', ['$scope', 'jobFactory', function($scope, jobFactory){
  $scope.newJob = {
    state:'unassigned'
  };
  var me = this;
  $scope.update = function(newJob){
    console.log(newJob);
    jobFactory.createJob(newJob).success(function(){
      $scope.status = "job created";
      $scope.jobs.push(newJob);
    })
    .error(function(error){
      $scope.status = "Error " + error.message;
    });
    $scope.newJob = {state:'unassigned'};
  };
}]);


// Declare app level module which depends on filters, and services
/*
angular.module('businessOrganizer', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/view1', {
      templateUrl: 'partials/partial1',
      controller: 'MyCtrl1'
    }).
    when('/view2', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    }).
    otherwise({
      redirectTo: '/view1'
    });

  $locationProvider.html5Mode(true);
});
*/