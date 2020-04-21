/** @type {typeof AdonisType.Model} */
const Model = use('Model')

class Role extends Model {
  users() {
    return this.manyThrough('App/Models/UserRole', 'user')
  }
}

module.exports = Role
