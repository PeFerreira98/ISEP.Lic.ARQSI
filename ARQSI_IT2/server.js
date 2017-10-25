var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');

app.use(morgan('dev')); // log requests to the console
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// DATABASE SETUP
var mongoose = require('mongoose');
mongoose.connect('mongodb://client:qwerty@ds042417.mlab.com:42417/arqsi20172018'); // connect to database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () { console.log("DB connection alive"); });

// Receita models lives here
var Receita = require('./Models/receita');

// ROUTES FOR OUR API =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
    console.log('Request Received...');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) { res.json({ message: 'Connection Established. Welcome to ReceitasAPIv0.1' }); });

// on routes that end in /receitas ----------------------------------------------------
router.route('/receitas')

    // create a Receita
    .post(function (req, res) {

        var receita = new Receita();
        receita.name = req.body.name;

        receita.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Receita created!' });
        });

    })

    // get all the Receitas
    .get(function (req, res) {
        Receita.find(function (err, receitas) {
            if (err)
                res.send(err);

            res.json(receitas);
        });
    });
/*
// on routes that end in /bears/:bear_id ----------------------------------------------------
router.route('/bears/:bear_id')

	// get the bear with that id
	.get(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	})

	// update the bear with this id
	.put(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {

			if (err)
				res.send(err);

			bear.name = req.body.name;
			bear.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Bear updated!' });
			});

		});
	})

	// delete the bear with this id
	.delete(function(req, res) {
		Bear.remove({
			_id: req.params.bear_id
		}, function(err, bear) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});
*/

// START THE SERVER =============================================================================
app.use('/receitasapi', router);

app.listen(port);
console.log('API hosted on port ' + port);
