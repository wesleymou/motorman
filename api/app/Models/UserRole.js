'use strict'
const AdonisType = require('../../types')

/** @type {typeof AdonisType.Model} */
const Model = use('Model')

class UserRole extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }

  team() {
    return this.belongsTo('App/Models/Team')
  }

  group() {
    return this.belongsTo('App/Models/Group')
  }

  role() {
    return this.belongsTo('App/Models/Role')
  }

  permissions() {
    return this.manyThrough('App/Models/Group', 'permissions')
  }
}


module.exports = UserRole