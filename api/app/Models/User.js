/** @type {typeof AdonisType.Model} */
const Model = use('Model')

/** @type {typeof AdonisType.Hash} */
const Hash = use('Hash')

class User extends Model {
  getWeight(weight) {
    return Number(weight) || null
  }

  static get hidden() {
    return ['password']
  }

  static get dates() {
    return super.dates.concat(['dob'])
  }

  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      /* eslint no-param-reassign: "off" */
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }

      if (!userInstance.dirty.nickname) {
        const { fullName } = userInstance
        const [firstName] = fullName.split(' ')
        userInstance.nickname = firstName
      }

      if (!userInstance.dirty.username) {
        userInstance.username = userInstance.email
      }
      /* eslint no-param-reassign: "error" */
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {typeof AdonisType.Relationship.HasMany}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }

  /**
   * @method teams
   * @return {Object}
   */
  teams() {
    return this.manyThrough('App/Models/UserRole', 'team')
  }

  /**
   * @method groups
   * @return {Object}
   */
  roles() {
    return this.hasMany('App/Models/UserRole')
  }

  groups() {
    return this.belongsToMany('App/Models/Group')
  }
}

module.exports = User
