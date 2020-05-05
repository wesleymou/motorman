/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Annotation extends Model {
  /**
   * @method user
   *
   * @return {import('@adonisjs/lucid/src/Lucid/Relations/BelongsTo')}
   */
  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Annotation
