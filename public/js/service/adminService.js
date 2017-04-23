'use strict';

module.exports = function($http) {

	// Movie Services
	this.getOmdbApi = function(movieName){
		return $http.get(`http://www.omdbapi.com/?t=${movieName}&plot=short&r=json`);
	};

	this.getMovieDetails = function(){
		return $http.get('http://localhost:8000/movie/movie');
	}

	this.insertMovieDetails = function(movie){
		console.log("movie", movie);
		var data = {
		  movieName: movie.Title,
			movieDirector: movie.Director,
			moviePoster: movie.Poster
		};
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
};
