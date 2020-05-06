/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class AuthController {
  async authenticate({ request, response, auth }) {
    const { email, password } = request.all()

    const user = await User.query().where({ email }).first()

    if (user && user.active) {
      const passwordCheck = await Hash.verify(password, user.password)

      if (passwordCheck) {
        // load permissions
        await user.loadMany({
          // application level permissions
          group: (group) => group.with('permissions'),
          // team level permissions
          roles: (role) => {
            role.with('team')
            role.with('permissions')
          },
        })

        const token = await auth.generate(user, { user: user.toJSON() })
        return response.send(token)
      }
    }

    return response.status(401).send()
  }
}

module.exports = AuthController
