'use strict';

module.exports = function($scope, HomeService, $http) {
	$http.get('http://localhost:8000/show/show')
	.then(function(response){
		if(response.status === 200){
			$scope.allShows = response.data;
			angular.forEach($scope.allShows, function(val, key){
				val.showDate = new Date(val.showDate).toDateString();
			})
		}
	})
};
