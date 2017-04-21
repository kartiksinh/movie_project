'use strict';


var angular = require('angular');
require('angular-ui-router');

var app = angular.module('movieApp', [ 'ui.router' ]);

require('./service');
require('./controllers');

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "views/home.html",
      controller: 'HomeController',
    })
    .state('booking', {
      url: "/booking",
      templateUrl: "views/booking.html",
      controller: 'BookingController',
    })
    .state('admin', {
      url: "/admin",
      templateUrl: "views/admin.html",
      controller: 'AdminController',
    })
    .state('admin.uploadMovie', {
      url: "/upload_movie",
      templateUrl: "views/uploadMovie.html",
    })
    .state('admin.city', {
      url: "/city",
      templateUrl: "views/city.html",
    })
    .state('admin.theatre', {
      url: "/theatre",
      templateUrl: "views/theatre.html",
    })
    .state('admin.showtimings', {
      url: "/timings",
      templateUrl: "views/showtimings.html",
    })
    .state('admin.assigntimings', {
      url: "/assign-timings",
      templateUrl: "views/assignTimings.html",
    })
    .state('admin.assignmovie', {
      url: "/assign-movie",
      templateUrl: "views/assignMovie.html",
      controller: function($scope){
        if($scope.allMovies && $scope.allCities && $scope.allTheatres){
          $scope.show = {
            movie: $scope.allMovies[0],
            city: $scope.allCities[0],
            theatre: $scope.allTheatres[0],
            time: $scope.allTheatres[0].theatreTimings[0],
          }
        }
      }
    })
    .state('cancellation', {
      url: "/cancellation",
      templateUrl: "views/cancellation.html",
      controller: 'CancellationController',
    });
    $urlRouterProvider.otherwise('/home');
});
