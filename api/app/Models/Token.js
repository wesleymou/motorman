'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Token extends Model {
  user_id;
  token;
  type;
  is_revoked;
}

module.exports = Token
