/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class LogType extends Model {
  /**
   * @method logs
   *
   * @return {import('@adonisjs/lucid/src/Lucid/Relations/BelongsTo')}
   */
  logs() {
    return this.belongsTo('App/Models/Log')
  }
}

module.exports = LogType
