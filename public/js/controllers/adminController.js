'use strict';

module.exports = function($scope, $http, adminService) {

	$scope.allMovies = [];
	$scope.allCities = [];

	$scope.movieName = '';

	// Get Movie Details from DB
	adminService.getMovieDetails()
	.then(function(res){
		if(res.status === 200){
			$scope.allMovies = res.data;
		}
	});

	// Get City Details from DB
	adminService.getCityDetails()
		.then(function(res){
			if(res.status === 200){
				$scope.allCities = res.data;
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

  // Get Show Details from DB
  adminService.getShowDetails()
    .then(function(res){
      if(res.status === 200){
        $scope.allShows = res.data;
      }
    });

	// Movie Functions
  $scope.addMovie = function(movie){
  	if(movie && movie.length > 0){
	  	adminService.getOmdbApi(movie)
	  	.then(function(response){
        // console.log('response', response);
	  		if(response.status === 200){
					var movie = {};
					adminService.insertMovieDetails(response.data)
						.then(function(res){
							$scope.allMovies.push(res.data);
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
  $scope.assignTiming = function(details, timing){
  	if(details.theatreDetails.theatreTimings.indexOf(timing) == -1){
	  	details.theatreDetails.theatreTimings.push(timing);
	  	$http.put(`http://localhost:8000/theatre/theatre/${details.theatreDetails._id}`, details.theatreDetails)
	  		.then(function(response){
			    console.log("response", response);
	  		})
  	} else {
  		alert('Selected timing already assigned');
  	}
  }

  //Show Methods
  $scope.addShow = function(show){
    show.showDate =  Date.parse(show.showDate.toISOString());
    show.showDate = new Date(show.showDate);
    adminService.insertShowDetails(show).then(function(response) {
      $scope.allShows.push(show);
      show = {
        movie: null,
        city: null,
        theatre: null,
        time: null,
        showDate: null
      };
    });
  }

  $scope.deleteShow = function(show, index){
    $http.delete(`http://localhost:8000/show/show/${show._id}`)
      .then(function(response){
        if(response.status === 200){
          $scope.allShows.splice(index, 1);
        }
      });
  }

};