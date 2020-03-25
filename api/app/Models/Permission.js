'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Permission extends Model {
    /** @type {string} */
    name
    /** @type {string} */
    description

    groups(){
        return this.belongsToMany('App/Models/Group')
    }
}

module.exports = Permission
