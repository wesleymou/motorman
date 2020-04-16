'use strict'
const AdonisType = require('../../types')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Team extends Model {
  members() {
    return this.hasMany('App/Models/Role')
  }
}

module.exports = Team
