
angular.module('censusing')
    .controller('AddBirthplaceModalCtrl', ['$scope', '$modalInstance', '$http',
        function ($scope, $modalInstance, $http) {

            $scope.ok = function() {
                $modalInstance.close(true);
            };

            $scope.cancel = function() {
                $modalInstance.dismiss();
            };

            $scope.getPlaces = function(value) {
                return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
                    params: {
                        address: value,
                        sensor: false
                    }
                }).then(function(response) {
                    var places = [];
                    angular.forEach(response.data.results, function(item) {
                        places.push(item.formatted_address + ' (' + item.geometry.location.lat + '/' + item.geometry.location.lng + ')');
                    });
                    return places;
                });
            };
        }
    ]);