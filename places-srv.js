angular.module('censusing')
	.factory('Places', ['$http', '$q',
			function($http, $q) {

				return {

					get: function (hint) {

						var defer = $q.defer();

						$http.get('http://maps.googleapis.com/maps/api/geocode/json', {
		                    params: {
		                        address: hint,
		                        sensor: false
		                    }
		                }).then(function(response) {
		                    defer.resolve(response.data.results);
		                });

		                return defer.promise;
					}
				};

			} 
		]);