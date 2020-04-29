/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Team extends Model {
  users() {
    return this.manyThrough('App/Models/UserRole', 'user')
  }

  members() {
    return this.hasMany('App/Models/UserRole')
  }

  logs() {
    return this.belongsToMany('App/Models/Log')
  }
}

module.exports = Team
