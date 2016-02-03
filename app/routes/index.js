'use strict';

var ReqHandler = require(process.cwd() + '/app/controllers/req-handler.server.js');

module.exports = function(app, db) {	

	var reqHandler = new ReqHandler(db);
	app.route('/')
		.get(reqHandler.getInfo);
}