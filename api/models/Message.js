/**
 * Message.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,
  attributes: {
  	contenu : {
  		type: 'text',
  		required: true
  	},
    discussion: {
      model: 'discussion'
    },
    // Add a reference to User
    author: {
      model: 'users'
    },

    
  },
};

