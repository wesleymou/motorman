/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Plan extends Model {
  getMonthlyPrice(value) {
    return Number(value) || null
  }
}

module.exports = Plan
