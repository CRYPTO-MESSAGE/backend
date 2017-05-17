/**
 * Discussion.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    messages: {
      collection: 'message',
      via: 'discussion'
    },
    // Add a reference to User
    owner: {
      model: 'users'
    },
    // Add a reference to User
    target: {
      model: 'users'
    }
  }
};

