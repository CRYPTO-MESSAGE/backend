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

		if (!req.body.message) {
      		return res.json(401, {err: 'Message required'});
		}  

	    Users.findOne({username: usernameDest}).exec( function (err, userDest) {
		      if (!userDest) {
		        return res.json(401, {err: 'invalid usernameDest'});
		      }

		      var token = jwToken.getToken(req)

		      Users.findOne({id : req.token.id}).exec( function (err, user) {

				if (!user) {
					return res.json(401, {err: 'invalid user emitter'});
				}

				// Check discussion if existe and get it or null
				var discussion = self.checkDiscussion(user, userDest);

				if (discussion === null) {
					Discussion.create({owner: user, target: userDest}).exec( function (err, disc) {

						if (err) { return res.serverError(err); }

  						sails.log('disc\'s id is:', disc.id);

  						discussion = disc;
					});
				}	

				// Messsage creation
				Message.create(req.body).exec(function (err, message) {
					if (err) {
						return res.json(err.status, {err: err});
					}

					if (message) {
						sails.log('Message created (no discussion yet) !');
					}

					message.populate({discussion: discussion, owner: user}).exec( function (err, messageEdited) { 
						if (err) {
							seils.log('Edit with discussion not work')
							return res.json(err.status, {err: err});
						}

						return res.json(200, 'Message created full success!');
					});

				}); // Message
		    }); //Users
		}); //Users dest
	},
	checkDiscussion: function (src, dest) {

		var discussion = null;

		Discussion.findOne({
	        or : [
	            {owner: src, target: dest},
	            {owner: dest, target: src}
	        ]
	    }).exec(function (err, disc) {
				if (disc.length) {
					discussion = disc;
				}
			});

	    return discussion;
	}
};

