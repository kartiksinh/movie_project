   
var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'), //parses information from POST


//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');
var dbHost = 'mongodb://localhost:27017/test';
mongoose.connect(dbHost);

var movieSchema = mongoose.Schema({
  movieID: String,
  movieName: String,
  movieDirector: String,
  moviePoster: String
 });
var Movie = mongoose.model('Movie', movieSchema, 'movie');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log("Connected to DB");
});


router.get('/movie', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Movie.find({}, function (err, docs) {
      if(err) return err;
      res.json(docs);
         
    });
});

router.get('/movie/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Movie.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);
         
    });
});

router.post('/movie', function(req, res){
  console.log(req.body);
  var id = req.body.movieID;
  var name = req.body.movieName;
  var poster = req.body.moviePoster;
  var director = req.body.movieDirector;
  var movie = new Movie({
    movieID : id,
    movieName:name,
    movieDirector: director,
    moviePoster: poster
  });

  movie.save(function(err, docs){
    if ( err ) throw err;
    console.log("Book Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/movie/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Movie.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/movie/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Movie.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})


// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;