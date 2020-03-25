'use strict'

/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class AuthController {
  async authenticate({ request, response, auth }) {
    const { email, password } = request.all()

    const user = await User.findBy('email', email)

    if (user) {
      const passwordCheck = await Hash.verify(password, user.password)

      if (passwordCheck) {
        const token = auth.generate(user, { user })
        return token
      }

      if (password === user.password)
        return auth.generate(user, { user })

    }

    return response.status(401).send()
  }
}

module.exports = AuthController
