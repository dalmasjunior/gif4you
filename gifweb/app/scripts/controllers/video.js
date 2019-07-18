'use strict';

/**
 * @ngdoc function
 * @name gif4youApp.controller:VideoCtrl
 * @description
 * # VideoCtrl
 * Controller of the gif4youApp
 */
angular.module('gif4youApp')
  .controller('VideoCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.file = null;
    $scope.private = false;
    $scope.videoDuration = 0;
    $scope.gifDuration = 15;
    $scope.gifStart = 0;
    $scope.gifInterval = 0;
    $scope.gifPassword = '';
    $scope.gifValidity = new Date();
    $scope.minValidity = new Date();
    $scope.created = false;
    $scope.showpwd = function () {
        console.log($scope.gifPassword)
    }
    var video = document.createElement('video');

    video.addEventListener("loadedmetadata", () => {
        $scope.videoDuration = Math.floor(video.duration);
        $scope.gifDuration = $scope.videoDuration > 15 ? 15 : $scope.videoDuration;
        $scope.$apply();
    }, false);

    $scope.startChange = () => {
        $scope.gifDuration = $scope.gifStart > ($scope.videoDuration - 15) ? ($scope.videoDuration - $scope.gifStart) : 15;        
    }

    $scope.getFile = function(el) {
        
        var file = el.files[0];
        var reader = new FileReader();
        var readerAux = new FileReader();
        $scope.videoPath = file.name;

        readerAux.onload = (e) => {
            getVideoDuration(e.target.result, file.type, video);
        }
        reader.onload = (e) => {
            $scope.file = e.target.result;
        };
        reader.readAsDataURL(file);
        readerAux.readAsArrayBuffer(file);
    };

    $scope.createGif = function() {
        gifshot.createGIF({
            'video': [$scope.file],
            'offset': $scope.gifStart,
            'numFrames': 10 * $scope.gifInterval
        },function(obj) {
            if(!obj.error) {
                var image = obj.image,
                animatedImage = document.createElement('img');
                animatedImage.src = image;
                var gifViewer = document.getElementsByClassName('gif-viewer')[0];
                gifViewer.appendChild(animatedImage);
              
                $scope.file = JSON.stringify(getBase64Image(obj.image));
                $scope.created = true;
                $scope.$apply();
            }
        });
    }

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

  function getVideoDuration(file, type, video) {
      var blob = new Blob([file], {type: type});
      var url = (URL || webkitURL).createObjectURL(blob);

      video.src = url
  }

function getBase64Image(base64string) {
    return base64string.replace(/^data:image\/(png|jpg|gif);base64,/, "");
}