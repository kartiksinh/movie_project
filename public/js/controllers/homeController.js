'use strict';

module.exports = function($scope, HomeService, $http, adminService) {
	$http.get('http://localhost:8000/show/show')
	.then(function(response){
		if(response.status === 200){
			$scope.allShows = response.data;
			angular.forEach($scope.allShows, function(val, key){
				val.showDate = new Date(val.showDate).toDateString();
			})
		}
	})

	$scope.showBookingModal = function(show){
		$('#myModal').modal('show');
		$scope.selectedShow = show;
	}

	$scope.bookShow = function(booking) {
		adminService.bookShow($scope.selectedShow._id, booking)
			.then(function(res){
				$('#myModal').modal('hide');
				if(res.status == 200){
					$scope.booking.name = null;
					$scope.booking.seats = null;
					$scope.booking.email = null;
				} else {
					alert('Error occured while booking show. Please try again.')
				}
			})
	}

};
