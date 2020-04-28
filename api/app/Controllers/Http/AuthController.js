/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class AuthController {
  async authenticate({ request, response, auth }) {
    const { email, password } = request.all()

    const user = await User.query()
      // team level permissions
      .with('roles', (role) => {
        role.with('team')
        role.with('permissions')
      })
      // application level permissions
      .with('group.permissions')
      .where('email', email)
      .first()

    if (user) {
      const passwordCheck = await Hash.verify(password, user.password)

      if (passwordCheck) {
        const token = auth.generate(user, { user: user.toJSON() })
        return token
      }
    }

    return response.status(401).send()
  }
}

module.exports = AuthController
