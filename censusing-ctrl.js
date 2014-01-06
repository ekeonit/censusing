
angular.module('censusing')
    .controller('CensusingCtrl', ['$scope', '$modal',
        function ($scope, $modal) {

            $scope.addBirthplace = function() {

                var m = $modal.open({
                    templateUrl: 'add-birthplace-modal.html',
                    controller: 'AddBirthplaceModalCtrl'
                });

                m.result.then(
                    function(birthPlace) {

                    }, function() {

                    });
            };

        }
    ]);