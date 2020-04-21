const chance = require('chance')
const moment = require('moment')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Token extends Model {
  static get dates() {
    return super.dates.concat(['expires_at'])
  }

  static async createPasswordRecoveryToken(userId) {
    const token = await Token.create({
      user_id: userId,
      type: 'password_recovery',
      token: chance().guid(),
      expires_at: moment().add(2, 'hours'),
    })
    return token
  }

  static verifyResetPasswordToken(token) {
    return token && !token.is_revoked && moment().isBefore(token.expires_at)
  }
}

module.exports = Token
