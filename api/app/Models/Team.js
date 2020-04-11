'use strict'
const AdonisType = require('../../types')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Team extends Model {
  /** @type {string} */
  name

  /** @type {string} */
  description

  /** @type {boolean} */
  active

  /**
   * @method users
   * @return {Object}
   */
  users() {
    return this.manyThrough('App/Models/UserRole', 'user', 'id', 'team_id')
  }

  /**
   * @method groups
   * @return {Object}
   */
  groups() {
    return this.manyThrough('App/Models/UserRole', 'group', 'id', 'team_id')
  }
}

module.exports = Team
