
angular.module('censusing')
	.factory('Birthplaces', ['$http', '$q',
		function($http, $q) {

			var baseUrl = 'https://api.parse.com/1/classes/birth_places',
				appKey = 'f68ezLyYfGoVF6bnEEBZCQ3gU2gwFMjRxDDrXKW8',
        		apiKey = 'G01EciKaHf4AY5uBY51XVSqICZTnu0oBfmaP1nRt',
        		headers = {
            		'X-Parse-Application-Id': appKey,
            		'X-Parse-REST-API-Key': apiKey
        		};

			return {

				create: function (birthplace) {

					var defer = $q.defer();

					$http({
						method: 'POST',
						url: baseUrl,
						headers: headers,
						data: birthplace
					}).then(function (response) {						
						defer.resolve(Date.parse(response.data.createdAt));
					});

					return defer.promise;

				},

				get: function() {

					var defer = $q.defer();

					$http({
						method: 'GET',
						url: baseUrl,
						headers: headers	
					}).then(function (response) {
						angular.forEach(response.data.results, function(value, key) {
							value.createdAt = Date.parse(value.createdAt);
						});
						defer.resolve(response.data.results);
					});

					return defer.promise;

				}

			};
		}]
	);