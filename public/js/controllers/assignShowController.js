'use strict';

module.exports = function($scope){
	$scope.theatreInCity = [];

	$scope.citySelected = function(city){
		var theatres = []
		angular.forEach($scope.allTheatres, function(val, key){
			if(val.theatreCity === city){
				theatres.push(val);
			}
		})
		$scope.theatreInCity = theatres;
	}
}