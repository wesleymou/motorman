/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const chance = require('chance')
const mail = require('../../mail')

/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User')

/** @typedef {import('@adonisjs/mail/src/Mail')} Mail */
const Mail = use('Mail')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET user
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response }) {
    const users = await User.all()
    return response.json(users.toJSON())
  }

  /**
   * Create/save a new user.
   * POST user
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const payload = request.only([
      'username', 'email', 'nomeCompleto', 'avatar',
      'telefone', 'apelido', 'rg', 'cpf',
      'cep', 'estado', 'cidade', 'bairro',
      'endereco', 'numero', 'complemento', 'peso',
      'altura', 'dataNasc', 'nomeResponsavel', 'telefoneResponsavel',
      'emailResponsavel', 'grauParentescoResponsavel', 'planoSaude', 'sexo',
    ])

    const generatedPassword = chance().string({
      length: 8,
      alpha: true,
      numeric: true,
      symbols: false,
    })

    const user = await User.create({
      ...payload,
      password: generatedPassword,
      active: true
    })

    try {
      await mail.sendWelcomeMessage({
        ...user,
        to: user.email,
        generatedPassword
      })

      return response.status(201).send('OK')
    } catch (error) {
      await user.delete()
      return response.status(500).send('Internal Server Error')
    }
  }

  /**
   * Display a single user.
   * GET user/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response }) {
    const users = await User.all()
    response.json(users.toJSON())

    const { id } = params

    const user = await User.find(id)

    if (user) {
      return response.json(user.toJSON())
    }
    return response.status(404).send()
  }

  /**
   * Update user details.
   * PUT or PATCH user/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const { id } = params

    const payload = request.only([
      'username', 'email', 'nomeCompleto', 'avatar',
      'telefone', 'apelido', 'rg', 'cpf',
      'cep', 'estado', 'cidade', 'bairro',
      'endereco', 'numero', 'complemento', 'peso',
      'altura', 'dataNasc', 'nomeResponsavel', 'telefoneResponsavel',
      'emailResponsavel', 'grauParentescoResponsavel', 'planoSaude', 'sexo',
    ])

    const user = await User.find(id)

    if (user) {
      user.merge(payload)
      await user.save()
      return response.status(200).send()
    }

    return response.status(404).send()

  }

  /**
   * Delete a user with id.
   * DELETE user/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const { id } = params
    const user = await User.find(id)

    if (user) {
      user.active = false
      await user.save()
      return response.status(200).send()
    }

    return response.status(404).send()
  }

  /**
   * Delete a user with id.
   * POST user/restore/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async restore({ params, request, response }) {
    const { id } = params
    const user = await User.find(id)

    if (user) {
      user.active = true
      await user.save()
      return response.status(200).send('OK')
    }

    return response.status(404).send('OK')
  }


  /**
   * Update the user password
   * POST user/:id/change-password
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async changePassword({ params, request, response, auth }) {
    const { id } = params
    const { currentPassword, password } = request.body

    const user = await User.find(id)

    if (user) {
      const verified = await auth.attempt(user.email, currentPassword)

      if (verified) {
        user.password = password
        await user.save()

        const token = await auth.generate(user, { user: user.toJSON() })

        return response.status(200).send(token)
      }
    }
    return response.status(400).send('Bad Request')
  }
}

module.exports = UserController
