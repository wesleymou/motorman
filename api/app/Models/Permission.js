'use strict'
const AdonisType = require('../../types')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Permission extends Model {
    /** @type {string} */
    name
    /** @type {string} */
    description

    /**
     * @method groups
     * @return {typeof AdonisType.Relationship.BelongsToMany}
     */
    groups(){
        return this.belongsToMany('App/Models/Group','permission_id','group_id','id','id')
    }
}

module.exports = Permission
