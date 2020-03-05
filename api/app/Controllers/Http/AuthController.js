'use strict'

class AuthController {
  async authenticate({ request, response, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)

    if (token) {
      return token
    } else {
      return response.status(401).send()
    }
  }
}

module.exports = AuthController
