var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'), //parses information from POST

//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');

var theatreSchema = mongoose.Schema({
  theatreID: String,
  theatreName: String,
  theatreSeats: Number,
  theatrePrice: Number,
  theatreCity: String,
  theatreTimings: Array
});

var Theatre = mongoose.model('Theatre', theatreSchema, 'theatre');

router.get('/theatre', function (req, res) {
  console.log("REACHED GET FUNCTION ON SERVER");
  Theatre.find({}, function (err, docs) {
    res.json(docs);
  });
});

router.get('/theatre/:id', function (req, res) {
  console.log("REACHED GET ID FUNCTION ON SERVER");
  Theatre.find({_id: req.params.id}, function (err, docs) {
    res.json(docs);
  });
});

router.post('/theatre', function(req, res){
  var id = req.body.theatreID;
  var name = req.body.theatreName;
  var seats = req.body.theatreSeats;
  var price = req.body.theatrePrice;
  var theatreCity = req.body.theatreCity;
  var theatre = new Theatre({
    theatreID: id,
    theatreName: name,
    theatreSeats: seats,
    theatrePrice: price,
    theatreCity: theatreCity 
  });

  theatre.save(function(err, docs){
    if ( err ) throw err;
    console.log("Book Saved Successfully");
    res.json(docs);
  });
})

router.delete('/theatre/:id', function(req, res){
    console.log("REACHED Delete FUNCTION ON SERVER");
    Theatre.remove({_id:req.params.id}, function(err, docs){
      res.json(docs);
    });
})

router.put('/theatre/:id', function(req, res){
    console.log("REACHED PUT");
    Theatre.findOneAndUpdate({_id:req.params.id}, req.body, {new: true},function (err, data) {
        console.log("data", data);
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