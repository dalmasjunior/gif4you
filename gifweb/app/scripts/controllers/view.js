'use strict';

/**
 * @ngdoc function
 * @name gif4youApp.controller:ViewCtrl
 * @description
 * # ViewCtrl
 * Controller of the gif4youApp
 */
angular.module('gif4youApp')
    .controller('ViewCtrl', ['$scope', '$routeParams', '$http', '$location', function ($scope, $routeParams, $http, $location) {
        $scope.fileSrc = '#';
        $scope.pwdRequest = null;
        $scope.loaded = false;
        $scope.error = false;

        var modal = document.getElementById('pwdRequestModal');
        var gifSrc = '';
        var gifPwd = '';
        $http.get(`http://${location.host}/gif/${$routeParams.id}`).then( result => {
            if (result["data"]["gif"]) {
                gifSrc = `http://${location.host}/${result.data.gif.filename}`;
                $scope.fileId = result.data.gif.id;
                if(result.data.gif.private) {
                    gifPwd = result.data.gif.password;
                    $(modal).modal('show');
                    
                } else {
                    $(modal).modal('hide');
                    $scope.fileSrc = gifSrc;
                    $scope.loaded = true;
                }
            } else {
                $scope.error= true;
            }
        });  
        
        $scope.validatePwd = function () {
            if($scope.pwdRequest == gifPwd){
                $scope.fileSrc = gifSrc;
                $(modal).modal('hide');
                $scope.loaded = true;
            } else {
                alert('Wrong Password!');
            }
        }

        $scope.downloadFile = function() {
            var anchor = angular.element('<a/>');
            anchor.attr({
                href: gifSrc,
                target: '_blank',
                download: 'gif4you.gif'
            })[0].click();
        };
    }
]);