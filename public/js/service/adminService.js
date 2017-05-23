'use strict';

module.exports = function($http) {

	// Movie Services
	this.getOmdbApi = function(movieName){
		// return $http.get(`http://www.omdbapi.com/?t=${movieName}&plot=short&r=json`);
		return $http.get(`https://api.themoviedb.org/3/search/movie?api_key=d3b3adf58dfcadd62eef39a8e58e984a&language=en-US&page=1&include_adult=true&query=${movieName}`);
	};

	this.getMovieDetails = function(){
		return $http.get('http://localhost:8000/movie/movie');
	}

	this.insertMovieDetails = function(movie){
		// console.log("movie", movie);
		var data = {
		  	movieName: movie.results[0].title,
			// movieDirector: movie.Director,
			moviePoster: `https://image.tmdb.org/t/p/w500${movie.results[0].poster_path}`
		};
		// console.log("data", data);
		return $http.post('http://localhost:8000/movie/movie', data);
	}

	// City Services
	this.getCityDetails = function(){
		return $http.get('http://localhost:8000/city/city');
	}

	this.insertCityDetails = function(cityName){
		var data = {
			"cityName": cityName
		};
		return $http.post('http://localhost:8000/city/city', data);
	}

	// Theatre Services
	this.getTheatreDetails = function(){
		return $http.get('http://localhost:8000/theatre/theatre');
	}

	this.insertThetreDetails = function(theatre){
		return $http.post('http://localhost:8000/theatre/theatre', theatre);
	}

	// Timing Services
	this.getTimingDetails = function(){
		return $http.get('http://localhost:8000/timing/timing');
	}

	this.insertTimingDetails = function(timing){
		return $http.post('http://localhost:8000/timing/timing', timing);
	}

	// Show Services
	this.getShowDetails = function(){
		return $http.get('http://localhost:8000/show/show');
	}

	this.insertShowDetails = function(show){
		return $http.post('http://localhost:8000/show/show', show);
	}
};
