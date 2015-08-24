'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('bOrgsanizer-services')
	.factory('jobFactory', ['$http', function($http){

    var urlBase = '/jobs/';
    var jobFactory = {};

    jobFactory.getJobs = function(){
      return $http.get(urlBase + 'all');
    }

    return jobFactory;
  }]);
