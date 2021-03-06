var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'), //parses information from POST

//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');

var showSchema = mongoose.Schema({
  showID: String,
  movie: Object,
  city: Object,
  theatre: Object,
  time: String,
  showDate: Date,
  availableSeats: Number,
  bookedSeats: Number,
  bookings: [
    {
      name: String,
      email: String,
      seats: Number,
    }
  ],
});

var Show = mongoose.model('Show', showSchema, 'show');

router.get('/show', function (req, res) {
  console.log("REACHED GET FUNCTION ON SERVER");
  Show.find({}, function (err, docs) {
    res.json(docs);
  });
});

router.get('/show/:id', function (req, res) {
  console.log("REACHED GET ID FUNCTION ON SERVER");
  Show.find({_id: req.params.id}, function (err, docs) {
    res.json(docs);
  });
});

router.post('/show', function(req, res){
  console.log('req.body', req.body);
  var id = req.body.showID;
  var movie = req.body.movie;
  var city = req.body.city;
  var theatre = req.body.theatre;
  var time = req.body.time;
  var showDate = req.body.showDate;
  var availableSeats = req.body.theatre.theatreSeats;
  var bookedSeats = 0;
  var show = new Show({
    showID : id,
    movie: movie,
    city: city,
    theatre: theatre,
    time: time,
    showDate: showDate,
    availableSeats: availableSeats,
    bookedSeats: bookedSeats,
    bookings: []
  });

  show.save(function(err, docs){
    if ( err ) throw err;
    console.log("Book Saved Successfully");
    res.json(docs);
  });
})

router.delete('/show/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
    Show.remove({_id:req.params.id}, function(err, docs){
      res.json(docs);
    });
})

router.put('/show/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Show.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
});

router.put('/booking/:id', function(req, res){
  Show.findByIdAndUpdate(req.params.id, {
    $push: { bookings: req.body},
    $inc: { "availableSeats": -(req.body.seats), "bookedSeats": (req.body.seats)}
  }, {new: true}, function (err, data) {
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