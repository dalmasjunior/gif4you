'use strict';

/**
 * @ngdoc overview
 * @name gif4youApp
 * @description
 * # gif4youApp
 *
 * Main module of the application.
 */
angular
  .module('gif4youApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/view/:id', {
        templateUrl: 'app/views/view.html',
        controller: 'ViewCtrl',
        controllerAs: 'view'
      })
      .when('/video', {
        templateUrl: 'app/views/video.html',
        controller: 'VideoCtrl',
        controllerAs: 'video'
      })
      .when('/gif', {
        templateUrl: 'app/views/gif.html',
        controller: 'GifCtrl',
        controllerAs: 'gif'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
