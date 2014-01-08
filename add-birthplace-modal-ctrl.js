
angular.module('censusing')
    .controller('AddBirthplaceModalCtrl', ['$scope', '$modalInstance', '$http', 'Birthplaces', 'Places',
        function ($scope, $modalInstance, $http, Birthplaces, Places) {

            // hack for angular-ui modal form scope bug
            $scope.form = {};

            $scope.ok = function() {

                var birthplace = {
                    personName: $scope.form.personName,
                    placeName: $scope.form.birthPlace.formatted_address,
                    lat: $scope.form.birthPlace.geometry.location.lat,
                    lng: $scope.form.birthPlace.geometry.location.lng,
                };

                Birthplaces
                    .create(birthplace)
                    .then(function(createdAt) {
                        birthplace.createdAt = createdAt;
                        $modalInstance.close(birthplace);                    
                    });
            };

            $scope.cancel = function() {
                $modalInstance.dismiss();
            };

            $scope.getPlaces = function(value) {
                return Places.get(value);
            };
        }
    ]);