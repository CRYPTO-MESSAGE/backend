/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

// We don't want to store password with out encryption
var bcrypt = require('bcrypt');

module.exports = {
  
  schema: true,
  
  attributes: {
    username: {
      type: 'string',
      unique: true // Yes unique one
    },
    // Add a reference to Discussion owned
    discussionsOwn: {
      collection: 'discussion',
      via: 'owner'
    },
    // Add a reference to Discussion
    discussionsReceive: {
      collection: 'discussion',
      via: 'target'
    },
    // Add a reference to Discussion
    messages: {
      collection: 'message',
      via: 'author'
    },

    // Add a reference to Discussion
    contacts: {
      collection: 'users',
      via: 'contactsOf'
    },

    contactsOf: {
      collection: 'users',
      via: 'contacts'
    },

    encryptedPassword: {
      type: 'string'
    },
    // We don't wan't to send back encrypted password either
    toJSON: function () {
      var obj = this.toObject();
      delete obj.encryptedPassword;
      return obj;
    }
  },
  // Here we encrypt password before creating a User
  beforeCreate : function (values, next) {

  	values.username = "user" + randomize.nombreAleatoire(5000, 10000, true)
  	
    bcrypt.genSalt(10, function (err, salt) {
      if(err) return next(err);
      bcrypt.hash(values.password, salt, function (err, hash) {
        if(err) return next(err);
        values.encryptedPassword = hash;
        next();
      })
    })
  },
  
  comparePassword : function (password, user, cb) {

    bcrypt.compare(password, user.encryptedPassword, function (err, match) {

      if(err) cb(err);
      if(match) {
        cb(null, true);  
      } else {
        cb(err);
      }
    })
  },

  checkStrength : function (password, cb) {

    if (password.length > 10) {
      if(/(\d)/.test(password)) {
        if(/[A-Z]/.test(password)) {
          if(/\W/.test(password)) {
            cb(null, true);
          } else {
            cb("Caractère spéciaux manquant.");
          }
        } else {
          cb("Lettre majuscule manquante.");
        }
      } else {
        cb("Chiffre manquant.");
      }
    } else {
      cb("Plus de 10 caractère requis.");
    }
  }
};