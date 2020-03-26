'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Group extends Model {
    /** @type {string} */
    name
    /** @type {string} */
    description

    permissions(){
        return this.belongsToMany('App/Models/Permission','group_id','permission_id','id','id')
        .pivotTable('group_permission')
    }
}

module.exports = Group
