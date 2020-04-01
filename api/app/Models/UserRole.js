'use strict'
const AdonisType = require('../../types')

/** @type {typeof AdonisType.Model} */
const Model = use('Model')

class UserRole extends Model {

    /**
    * @method user
    * @return {Object}
    */
    user() {
        return this.belongsTo('App/Models/User')
    }

    /**
   * @method team
   * @return {Object}
   */
    team() {
        return this.belongsTo('App/Models/Team')
    }

    /**
   * @method group
   * @return {Object}
   */
    group() {
        return this.belongsTo('App/Models/Group')
    }
}

module.exports = UserRole