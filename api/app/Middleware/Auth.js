'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Auth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, auth, response }, next) {
    // const { Authorization } = request.headers()

    try {
      await auth.check()
    } catch (error) {
      response.unauthorized()
      response.send()
    }
    await next()
  }
}

module.exports = Auth
