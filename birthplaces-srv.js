
angular.module('censusing')
	.factory('Birthplaces', ['$http',
		function($http) {

			var baseUrl = 'https://api.parse.com/1/classes/birth_places',
				appKey = 'f68ezLyYfGoVF6bnEEBZCQ3gU2gwFMjRxDDrXKW8',
        		apiKey = 'G01EciKaHf4AY5uBY51XVSqICZTnu0oBfmaP1nRt',
        		headers = {
            		'X-Parse-Application-Id': appKey,
            		'X-Parse-REST-API-Key': apiKey
        		};

			return {

				create: function (birthplace) {

					return $http({
						method: 'POST',
						url: baseUrl,
						headers: headers,
						data: birthplace
					});

				}

			};
		}]
	);