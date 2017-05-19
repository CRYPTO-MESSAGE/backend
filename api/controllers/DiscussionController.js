/**
 * DiscussionController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res) {
		sails.log("Herre")


		Users
			.findOne({id : req.token.id}).exec( function (err, user) {

 				if (!user) {
 					return res.json(401, {err: 'invalid user emitter'});
 				}

				Discussion.find({
					or : [
						{owner: user.id},
						{target: user.id}
					]
				})
				.populate("messages")
				.exec( function (err, discussions) {

		 				if (!discussions) {
		 					return res.json(401, {err: 'invalid discussions'});
		 				}

						return res.json(200, { discussions: discussions});
		 		});
	 		});
	}
};

