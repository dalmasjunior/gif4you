'use strict';

/**
 * @ngdoc function
 * @name gif4youApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gif4youApp
 */
angular.module('gif4youApp')
  .controller('MainCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.teste = function (media){
      $location.path(media);
    };
  }]);