'use strict';

module.exports = function($scope, $http, adminService) {

	$scope.allMovies = [];
	$scope.allCities = [];

	$scope.movieName = '';
	!function(){

		// Get Movie Details from DB
		adminService.getMovieDetails()
		.then(function(res){
			if(res.status === 200){
				angular.forEach(res.data, function(val, key){
					var movie = {}
					adminService.getOmdbApi(val.movieName)
						.then(function(response){
							if(response.status === 200){
								movie['id'] = val._id;
								movie['Title'] = response.data.Title;
								movie['Director'] = response.data.Director;
								$scope.allMovies.push(movie);
							}
					});
				});
			}
		});

		// Get City Details from DB
		adminService.getCityDetails()
			.then(function(res){
				if(res.status === 200){
					angular.forEach(res.data, function(val, key){
						var city = {};
						city['id'] = val._id;
						city['cityName'] = val.cityName;
						$scope.allCities.push(city);
					})
				}
			});

		// Get Theatre Details from DB
		adminService.getTheatreDetails()
			.then(function(res){
				if(res.status === 200){
					$scope.allTheatres = res.data;
				}
			});

		// Get Timing Details from DB
		adminService.getTimingDetails()
			.then(function(res){
				if(res.status === 200){
					$scope.allTimings = res.data;
				}
			});

	}();

	// Movie Functions
  $scope.addMovie = function(movie){
  	if(movie && movie.length > 0){
	  	adminService.getOmdbApi(movie)
	  	.then(function(response){
	  		if(response.status === 200){
					var movie = {};
					adminService.insertMovieDetails(response.data.Title)
						.then(function(res){
							movie['id'] = res.data._id;
							movie['Title'] = response.data.Title;
							movie['Director'] = response.data.Director;
							$scope.allMovies.push(movie);
						}, function(err){
							console.log(err);
						})
	  		}
	  	});
  	}
  }

  $scope.deleteMovie = function(movie, index){
  	$http.delete(`http://localhost:8000/movie/movie/${movie.id}`)
  		.then(function(response){
  			if(response.status === 200){
  				$scope.allMovies.splice(index, 1);
  			}
  		});
  }

  // City Functions
  $scope.addCity = function(citi){
  	if(citi && citi.length > 0){
  		adminService.insertCityDetails(citi)
			.then(function(response){
				console.log("response", response);
				if(response.status === 200){
					var city = {};
					city['cityName'] = response.data.cityName;
					city['id'] = response.data._id;
					$scope.allCities.push(city);
				}
			});
  	}
  }

  $scope.deleteCity = function(citi, index){
  	$http.delete(`http://localhost:8000/city/city/${citi.id}`)
  		.then(function(response){
  			if(response.status === 200){
  				$scope.allCities.splice(index, 1);
  			}
  		});
  }

  // Theatre Methods
  $scope.addTheatre = function(theatre){
  	adminService.insertThetreDetails(theatre)
  		.then(function(response){
  			$scope.allTheatres.push(response.data);
  		});
  }

  $scope.deleteTheatre = function(theatre, index){
  	$http.delete(`http://localhost:8000/theatre/theatre/${theatre._id}`)
  		.then(function(response){
  			if(response.status === 200){
  				$scope.allTheatres.splice(index, 1);
  			}
  		});
  }

  // Show timing methods
  $scope.addTiming = function(timing){
      console.log("timing", timing);
  	adminService.insertTimingDetails(timing)
  		.then(function(response){
  			$scope.allTimings.push(response.data);
  		})
  }

  $scope.deleteTimings = function(timing, index){
  	$http.delete(`http://localhost:8000/timing/timing/${timing._id}`)
  		.then(function(response){
  			if(response.status === 200){
  				$scope.allTimings.splice(index, 1);
  			}
  		});
  }

  // assign Timing methods
  $scope.assignTiming = function(details){
  	details.theatreDetails.theatreTimings.push(details.timing);
  	console.log(details.theatreDetails);
  	$http.put(`http://localhost:8000/theatre/theatre/${details.theatreDetails._id}`, details.theatreDetails)
  		.then(function(response){
		    console.log("response", response);
  		})
  }

  $scope.submitShow = function(show){
  	$scope.allShows.push(show);
  	console.log($scope.allShows);
  }

};