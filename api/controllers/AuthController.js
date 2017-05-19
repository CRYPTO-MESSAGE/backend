/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function (req, res) {
    var username = req.param('username');
    var password = req.param('password');

    sails.log("User /auth index action")
    if (!username || !password) {
      sails.log("username and password required")
      return res.json(401, {err: 'username and password required'});
    }

    Users.findOne({username: username}, function (err, user) {
      if (!user) {
        sails.log("invalid username or password")
        return res.json(401, {err: 'invalid username or password'});
      }

      Users.comparePassword(password, user, function (err, valid) {
        if (err) {
          sails.log("forbidden")
          return res.json(403, {err: 'forbidden'});
        }

        if (!valid) {
          sails.log("Secondtime :after bcrypt check invalid username or password")
          return res.json(401, {err: 'invalid username or password'});
        } else {
          sails.log("Successs")
          res.json({
            user: user,
            token: jwToken.issue({id : user.id })
          });
        }
      });
    })
  }
};
