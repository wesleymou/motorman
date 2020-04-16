'use strict'
const AdonisType = require('../../types')

/** @type {typeof AdonisType.Model} */
const Model = use('Model')

class Role extends Model {
    users() {
        return this.belongsToMany('App/Models/User')
    }

    teams() {
        return this.belongsToMany('App/Models/Team')
    }

    groups() {
        return this.belongsToMany('App/Models/Group')
    }

    permissions() {
        return this.manyThrough('App/Models/Group', 'permissions')
    }
}


module.exports = Role