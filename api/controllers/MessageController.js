/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {

 	create: function (req, res) {
 		if (!req.body.usernameDest) {
 			return res.json(401, {err: 'Destinataire required'});
 		}  

 		var usernameDest = req.body.usernameDest;

 		if (!req.body.contenu) {
 			return res.json(401, {err: 'Message required'});
 		}  

 		Users.findOne({username: usernameDest}).exec( function (err, userDest) {
 			if (!userDest) {
 				return res.json(401, {err: 'invalid usernameDest'});
 			}


 			Users.findOne({id : req.token.id}).exec( function (err, user) {

 				if (!user) {
 					return res.json(401, {err: 'invalid user emitter'});
 				}

				// Check discussion if existe and get it or null
				var discussion = null;
				sails.log("User and user dest")
				sails.log(userDest)
				sails.log(user)
				req.body.author = user

				Discussion.findOne({
					or : [
					{owner: user.id, target: userDest.id },
					{owner: userDest.id, target: user.id}
					]
				}).exec(function (err, disc) {
					if (err) {
						sails.log('Erreur discussion', err)
					}

					sails.log("find")
					if(disc) {
						req.body.discussion = disc;

						sails.log('discussion final: ', req.body.discussion)
						// Messsage creation
						Message.create(req.body).exec(function (err, message) {
							if (err) {
								return res.json(err.status, {err: err});
							}

							if (message) {
								sails.log('Message created (no discussion yet) !');
								res.json(200, {messages: req.body.discussion.messages, message: message, token: jwToken.issue({id: user.id})});
							}

						}); // Message
					} else {
						Discussion.create({owner: user, target: userDest}).exec( function (err, disc) {

							if (err) { return res.serverError(err); }

							sails.log('disc\'s id is:', disc.id);

							req.body.discussion = disc;

							sails.log('discussion final: ', req.body.discussion)
							// Messsage creation
							Message.create(req.body).exec(function (err, message) {
								if (err) {
									return res.json(err.status, {err: err});
								}

								if (message) {
									sails.log('Message created (no discussion yet) !');
									res.json(200, {messages: req.body.discussion.messages, message: message, token: jwToken.issue({id: user.id})});
								}

							}); // Message
						});
					}
				});

				

		    }); //Users
		}); //Users dest
 	}
 };

