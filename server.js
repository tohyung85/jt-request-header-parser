'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongo = require('mongodb').MongoClient;
var useragent = require('express-useragent');

var app = express();
var port = process.env.PORT || 3000;
var mongoURI = "mongodb://heroku_hsrcddnq:7k154da7j86hrpsig8s1n68vm4@ds055495.mongolab.com:55495/heroku_hsrcddnq";

mongo.connect(mongoURI, function(err, db) {
	if (err) {
		throw err;
	} else {
		console.log("MongoDB connected to port 27017..");
	}

	app.use(useragent.express());
	routes(app, db);

	app.listen(port, function(){
		console.log("listening to port "+ port+ "...");
	});
});

