/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function (req, res) {
		sails.log("Create")
		
 		if (!req.body.username) {
 			return res.json(401, {err: 'Pas de username fourni'});
 		}  

 		var username = req.body.username;

 		Users
	 		.findOne({username: username})
	 		.exec( function (err, contact) {
	 			if (!contact) {
	 				return res.json(401, {err: 'invalid contact : not found !'});
	 			}
				Users
					.findOne({id : req.token.id})
					.exec( function (err, user) {
						if (err) {
								sails.log('Error ', err)
						}

			 			if (!user) {
			 				return res.json(401, {err: 'invalid user !'});
			 			}

			 			// var user = user.pop()
						contact.contactsOf.add(user.id)
					    contact.save(
					      function(err){
					      	if (err) sails.log(err)
					     });

	 					return res.json(200, {contacts: user.contacts});
				});
		});
	},
	index: function (req, res) {
		sails.log("Index")
		Users.find({id : req.token.id}).exec( function (err, user) {

 				if (!user) {
 					return res.json(401, {err: 'invalid user emitter'});
 				}

 				return res.json(200, {user: user.contactsOf})
 		});
	},
};

