
angular.module('censusing')
    .controller('CensusingCtrl', ['$scope', '$modal', 'Birthplaces',
        function ($scope, $modal, Birthplaces) {

            // options used by the ui-map directive
            $scope.mapOptions = {
              center: new google.maps.LatLng(35.784, -78.670),
              zoom: 1,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            // track markers that have been added to the map
            // so that they can be removed later
            var markers = [];

            // adds a marker to the map, given a birthPlace object
            var addMarker = function(birthPlace) {
                var marker = new google.maps.Marker({
                      position: new google.maps.LatLng(birthPlace.lat, birthPlace.lng),
                      map: $scope.myMap,
                      title: birthPlace.personName + ' (' + birthPlace.placeName + ')'
                  });
                markers.push(marker);
            };

            // create a new birth place
            $scope.addBirthplace = function() {

                var m = $modal.open({
                    templateUrl: 'add-birthplace-modal.html',
                    controller: 'AddBirthplaceModalCtrl'
                });

                m.result.then(
                    function(birthPlace) {

                        $scope.birthPlaces.push(birthPlace);
                        addMarker(birthPlace);

                    }, function() {

                    });
            };

            // refreshes from the data store, and refreshes
            // the markers
            $scope.refresh = function () {

                Birthplaces.get().then(function (birthPlaces) {

                    $scope.birthPlaces = birthPlaces;

                    // update the markers by first 'disappearing' the current markers
                    // then creating new ones

                    angular.forEach(markers, function(value, key) {
                        value.setMap(null);
                    })

                    markers = [];

                    angular.forEach($scope.birthPlaces, function(value, key) {
                        addMarker(value);
                    });
                });                
            }

            // loads data on controller instantiation
            $scope.refresh();

        }
    ]);