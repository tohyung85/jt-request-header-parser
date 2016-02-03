'use strict';

function reqHandler (db) {
	var collection = db.collection('info');

	this.getInfo = function(req, res) {
		var clickProjection = {'_id': false};

		var ip = req.headers['x-forwarded-for']
		var software = req.useragent.platform + req.useragent.os;
		var Language = req.headers["accept-language"];
		var splitStr = Language.split(',');
		var userLanguage = splitStr[0];

		var information = {'ipaddress':ip, 'language': userLanguage, 'software': software};
		console.log(req.headers);
		collection.findOne({}, clickProjection, function(err, result){
			if (err) {
				throw err;
			}

			if (result) {
				collection.findAndModify(
					{},
					{'_id': 1},
					{$set: information},
					function(err, result) {
						if(err) {
							throw err;
						}
						collection.findOne({}, clickProjection, function(err, doc){
						if (err) {
							throw err;
						}
						res.json(doc);
					});
					}
				);
			} else {
				collection.insert(information, function(err){
					if (err) {
						throw err;
					}

					collection.findOne({}, clickProjection, function(err, doc){
						if (err) {
							throw err;
						}
						res.json(doc);
					});

				});
			}
		});
	};
}

module.exports = reqHandler;