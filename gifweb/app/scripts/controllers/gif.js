'use strict';

/**
 * @ngdoc function
 * @name gif4youApp.controller:GifCtrl
 * @description
 * # GifCtrl
 * Controller of the gif4youApp
 */
angular.module('gif4youApp')
  .controller('GifCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.file = null;
    $scope.private = false;
    $scope.gifPassword = '';
    $scope.gifValidity = new Date();
    $scope.minValidity = new Date();

    $scope.showpwd = function () {
        console.log($scope.gifPassword)
    }
    
    $scope.getFile = function(el) {
        
        var file = el.files[0];
        var reader = new FileReader();
        
        reader.onload = (e) => {             
            var image = e.target.result,
            animatedImage = document.createElement('img');
            animatedImage.src = image;

            var gifViewer = document.getElementsByClassName('gif-viewer')[0];
            gifViewer.appendChild(animatedImage);
            
            $scope.file = JSON.stringify(getBase64Image(e.target.result));
            $scope.$apply();
        };
        reader.readAsDataURL(file);
    };

    $scope.share = function () {
        var fd = new FormData();
        
        var data = {
            file: $scope.file,
            password: $scope.gifPassword,
            private: $scope.private,
            validaty: $scope.gifValidaty
        }
        for(var key in data)
			fd.append(key, data[key]);

        $http.post(`http://${location.host}/gif/save`, fd, {
            transformRequest: angular.identity,
            headers: { 
                Accept: '*/*',
                'content-type': undefined 
            }
        }).then(function (data) {
            console.log(data)
        })
        .catch(function (data, status) {
            console.log(data);
        });
    }
}]);
